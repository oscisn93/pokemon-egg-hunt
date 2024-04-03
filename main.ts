import {
  Application,
  Context,
  Router,
  send,
  Next,
} from "https://deno.land/x/oak@14.2.0/mod.ts";
import { v1 } from "https://deno.land/std@0.207.0/uuid/mod.ts";
import { bgGreen } from "https://deno.land/std@0.221.0/fmt/colors.ts";
import { ServerOptions, SocketMessage } from "./types.d.ts";

const options: ServerOptions = {
  port: 3000,
};

const sockets = new Map<string, WebSocket>();

const app = new Application();
const router = new Router();

async function staticFileHandler(ctx: Context, next: Next) {
  if (ctx.request.url.pathname.startsWith("/api/")) {
    await next();
  } else {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/game-client/www`,
      index: "index.html",
    });
  }
}

function WsHandler(ctx: Context) {
  if (!ctx.isUpgradable) {
    ctx.throw(501, "Not Implemented");
  }
  const ws = ctx.upgrade();
  ws.onopen = () => {
    const socketID = v1.generate() as string;
    sockets.set(socketID, ws);
    const message: SocketMessage = { type: "set-client-id", socketID };
    ws.send(JSON.stringify(message));
  };

  ws.onmessage = (msg) => {
    const message: SocketMessage | undefined = JSON.parse(msg.data);
    if (message?.type === "create-player") {
      console.log("Username: ", message.playerName);
    }
  };

  ws.onclose = () => {
    console.log("WebSocket closed");
  };
}

router.get("/ws", WsHandler);
app.use(router.routes());
app.use(staticFileHandler);

console.log(bgGreen(`Server is running on http://localhost:${options.port}`));

await app.listen(options);
