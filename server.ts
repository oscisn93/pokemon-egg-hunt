import {
  Application,
  Context,
  Router,
  send,
  Next,
} from "https://deno.land/x/oak@14.2.0/mod.ts";
import { v1 } from "https://deno.land/std@0.207.0/uuid/mod.ts";
import { bgGreen } from "https://deno.land/std@0.221.0/fmt/colors.ts";
import { SocketEventType } from "./game-client/src/enums.ts";
import { SocketID, ServerOptions, GameLobby, SocketEventMessage } from "./game-client/src/types.ts";
import GameState from "./state.ts";

const options: ServerOptions = {
  port: 3000,
};

const sockets = new Map<string, WebSocket>();
const _games: Record<string, GameLobby | GameState> = {};
const players = new Map<string, string>();

const app = new Application();
const router = new Router();

async function staticFileHandler(ctx: Context, next: Next) {
  if (ctx.request.url.pathname.startsWith("/api/")) {
    await next();
  } else {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/game-client/static`,
      index: "index.html",
    });
  }
}

// Oversimplified authentication. uses a map to store username and password
// TODO: use Deno KV if deployed with Deno Deploy
async function authUser(ctx: Context) {
  const gameComponent =
    "<div class='game-container'><canvas id='game'></canvas></div><script src='main.js'></scritp>";
  const data = await ctx.request.body.formData();
  if (data) {
    const username = data.get("username") as string;
    const password = data.get("password") as string;
    if (players.has(username)) {
      if (players.get(username) === password) {
        ctx.response.body = gameComponent;
      } else {
        ctx.throw(401, "Invalid password");
      }
    } else {
      players.set(username, password);
      ctx.response.body = gameComponent;
    }
  }
}

function WsHandler(ctx: Context) {
  if (!ctx.isUpgradable) {
    ctx.throw(501, "Not Implemented");
  }
  const ws = ctx.upgrade();
  ws.onopen = () => {
    const socketID = v1.generate() as SocketID;
    sockets.set(socketID, ws);
    const message: SocketEventMessage = {
      type: SocketEventType.PLAYER_JOINED,
      socketID,
    };
    ws.send(JSON.stringify(message));
  };

  ws.onmessage = (msg) => {
    const message: SocketEventMessage | undefined = JSON.parse(msg.data);
    if (message && message.type === SocketEventType.PLAYER_JOINED) {
      console.log("Username: ", message.value as string);
    }
  };

  ws.onclose = () => {
    console.log("WebSocket closed");
  };
}

router.get("/ws", WsHandler);
router.post("/api/auth/", authUser);
app.use(router.routes());
app.use(staticFileHandler);

console.log(bgGreen(`Server is running on http://localhost:${options.port}`));

await app.listen(options);
