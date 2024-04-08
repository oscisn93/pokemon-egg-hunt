import { Context, Next, send } from "https://deno.land/x/oak@14.2.0/mod.ts";
import { Database } from "./database.ts";
import {
  GameEvent,
  InputMessageEvent,
  isGameEvent,
  isInputMessageEvent,
} from "../shared/types.ts";

// middleware for handling static files
export async function staticFileHandler(ctx: Context, next: Next) {
  if (ctx.request.url.pathname.startsWith("/api/")) {
    await next();
  } else {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/dist/`,
      index: "index.html",
    });
  }
}

// TODO: Use Deno KV to store user data
export async function authRequestHandler(ctx: Context) {
  const data = await ctx.request.body.formData();
  if (data) {
    const username = data.get("username") as string;
    const password = data.get("password") as string;
    try {
      const db = Database.getInstance();
      const kv = await Deno.openKv();
      const session = await db.authUser(kv, username, password);
      ctx.cookies.set("session", session.userID, {
        expires: new Date(session.expires),
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
  // When a player is ready queue up a ready event
  const gameEvent = {
    type: "ready",
    data: { gameID: "1", playerID: "1" },
  } as GameEvent;
  const db = Database.getInstance();
  const kv = await Deno.openKv();
  await db.enqueGameEvent(kv, gameEvent);
  ctx.response.status = 200;
}

export async function gameEventHandler(ctx: Context) {
  const target = await ctx.sendEvents();
  // When a player joins queue up a join event
  target.addEventListener("open", () => {
    const gameEvent = {
      type: "join",
      data: { gameID: "1", playerID: "1" },
    } as GameEvent;
    kv.enqueue(gameEvent);
  });
  // When a player leaves queue up a leave event
  target.addEventListener("close", () => {
    const gameEvent = {
      type: "leave",
      data: { gameID: "1", playerID: "1" },
    } as GameEvent;
    kv.enqueue(gameEvent);
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
  const kv = await Deno.openKv();
  const db = Database.getInstance();
  await db.enqueInputEvent(kv, data);
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
