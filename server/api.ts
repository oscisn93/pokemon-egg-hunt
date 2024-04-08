import { Context, Next, send } from "https://deno.land/x/oak@14.2.0/mod.ts";

import {
  GameEvent,
  GameStatus,
  InputMessageEvent,
  isGameEvent,
  isInputMessageEvent,
} from "../shared/types.ts";
import {
  authUser,
  enqueGameEvent,
  enqueInputEvent,
  getGameStatusByID,
  getPlayerIDBySessionToken,
  SECRET,
} from "./database.ts";
import { accessToken } from "https://deno.land/x/access_token@1.0.0/mod.ts";

// middleware for handling static files
export async function staticFileHandler(ctx: Context, next: Next) {
  if (ctx.request.url.pathname.startsWith("/api/")) {
    await next();
  } else {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/client/static/`,
      index: "index.html",
    });
  }
}

// middleware for handling authorzed requests
export async function authMiddleware(ctx: Context, next: Next) {
  // only check the cookie for /api requests
  if (ctx.request.url.pathname.startsWith("/api")) {
    const session = ctx.cookies.get("session");
    if (session) {
      ctx.state.session = session;
      await next();
    } else {
      ctx.state.session = null;
      ctx.response.redirect("/auth");
    }
  } else {
    await next();
  }
}
// handles both register and login requests
export async function authRequestHandler(ctx: Context) {
  const data = await ctx.request.body.formData();
  if (data) {
    const username = data.get("username") as string;
    const password = data.get("password") as string;
    try {
      const session = await authUser(username, password);
      ctx.cookies.set("session", session.token, {
        exprires: new Date().getTime() + 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
      ctx.response.redirect("/matches");
    } catch (e) {
      switch (e.message) {
        case "INVALID_USERNAME":
          ctx.response.body = "Invalid username";
          break;
        case "INVALID_PASSWORD":
          ctx.response.body = "Invalid password";
          break;
        default:
          ctx.response.body = "Server error";
      }
    }
  }
}

export async function gameRequestHandler(ctx: Context) {
  const sessionToken = ctx.state.session;
  if (!accessToken.validate(sessionToken, SECRET)) {
    // Unauthorized
    ctx.response.status = 401;
    return;
  }

  let playerID: string;
  try {
    playerID = await getPlayerIDBySessionToken(sessionToken);
  } catch (e) {
    // Unauthorized
    ctx.response.status = 401;
    ctx.response.body = e.message;
    return;
  }
  
  const params = ctx.request.url.searchParams;
  const gameID = params.get("gameID");
  if (!gameID) {
    // Bad Request
    ctx.response.status = 400;
    return;
  }

  let gameStatus: GameStatus;

  try {
    gameStatus = await getGameStatusByID(gameID);
  } catch(e) {
    // Not Found
    ctx.response.status = 404;
    ctx.response.body = e.message;
    return;
  }
  if (!gameStatus.active) {
    // Forbidden
    ctx.response.status = 403;
    return;
  }
  const gameEvent = {
    type: "ready",
    data: { gameID, playerID },
  } as GameEvent;
  await enqueGameEvent(gameEvent);

  ctx.response.status = 200;
}

export async function gameEventHandler(ctx: Context) {
  const target = await ctx.sendEvents();
  // When a player joins queue up a join event
  target.addEventListener("open", async () => {
    const gameEvent = {
      type: "join",
      data: { gameID: "1", playerID: "1" },
    } as GameEvent;
    await enqueGameEvent(gameEvent);
  });
  // When a player leaves queue up a leave event
  target.addEventListener("close", async () => {
    const gameEvent = {
      type: "leave",
      data: { gameID: "1", playerID: "1" },
    } as GameEvent;
    await enqueGameEvent(gameEvent);
  });
  // The queue listener will receive messages from the KV store
  // and push them to the clients in realtime
  const kv = await Deno.openKv();
  kv.listenQueue((msg: unknown) => {
    if (isGameEvent(msg)) {
      target.dispatchEvent(msg);
    } else {
      console.error("Unknown message received:", msg);
    }
  });
}

export async function inputRequestHandler(ctx: Context) {
  const data: InputMessageEvent = await ctx.request.body.json();
  await enqueInputEvent(data);
  ctx.response.status = 200;
}

export async function inputEventHandler(ctx: Context) {
  const target = await ctx.sendEvents();
  // The queue listener will receive messages from the KV store
  // and push them to the clients in realtime
  const kv = await Deno.openKv();
  kv.listenQueue((msg: unknown) => {
    if (isInputMessageEvent(msg)) {
      target.dispatchEvent(msg);
    } else {
      console.error("Unknown message received:", msg);
    }
  });
}
