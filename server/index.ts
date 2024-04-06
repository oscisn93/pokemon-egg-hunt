import { v1 } from "https://deno.land/std@0.207.0/uuid/mod.ts";
import { bgGreen } from "https://deno.land/std@0.221.0/fmt/colors.ts";

import {
  Application,
  Context,
  Router,
  send,
  Next,
} from "https://deno.land/x/oak@14.2.0/mod.ts";

import GameState from "./state.ts";
import { GameLobby, ServerOptions } from "../client/src/types/types.ts";

const options: ServerOptions = {
  port: 3000,
};

const _games: Record<string, GameLobby | GameState> = {};
const players = new Map<string, string>();

const app = new Application();
const router = new Router();



router.post("/api/auth/", authUser);
app.use(router.routes());
app.use(staticFileHandler);

console.log(bgGreen(`Server is running on http://localhost:${options.port}`));

await app.listen(options);

