import { Context, Next, send } from "https://deno.land/x/oak@14.2.0/mod.ts";
import { Database } from "./database.ts";
import { ServerSentEvent } from "https://deno.land/x/oak@14.2.0/mod.ts";
import { GameEventType } from "../client/src/types/enums.ts";
import { v1 } from "https://deno.land/std@0.207.0/uuid/mod.ts";
import { readAll } from "https://deno.land/std@0.140.0/streams/conversion.ts";
// middleware for handling static files
export async function staticFileHandler(ctx: Context, next: Next) {
  if (ctx.request.url.pathname.startsWith("/api/")) {
    await next();
  } else {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/game-client/static`,
      index: "index.html",
    });
  }
}

// TODO: Use Deno KV to store user data
export async function authHandler(ctx: Context) {
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
      const matches = "dist/matches.html";
      const file = await Deno.open(`${Deno.cwd()}/game-client/${matches}`, { read: true});
      const content = new TextDecoder().decode(await readAll(file));
      Deno.close(file.rid);
      ctx.response.body = content;
    } catch(e) {
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

export async function getGameEventSource(ctx: Context) {
  const target = await ctx.sendEvents();
  const userID = v1.generate() as string;
  const gameEvent = new ServerSentEvent({
    type: GameEventType.READY,
    data: JSON.stringify({ userID }),
    eventInit: { id: v1.generate() as string },
  })
  target.dispatchEvent(gameEvent);
  target.addEventListener("close", () => {
    console.log("Event stream closed");
  });
}
