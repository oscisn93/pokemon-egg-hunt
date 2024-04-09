import { Application, Router } from "https://deno.land/x/oak@14.2.0/mod.ts";

import {
  authMiddleware,
  loginHandler,
  registerHandler,
  gameRequestHandler,
  gameEventHandler,
  inputRequestHandler,
  inputEventHandler,
  staticFileHandler,
} from "./api.ts";

const port = Deno.env.get("PORT") || "3000";
const app = new Application();
const router = new Router();
// auth routes
router.post("/login", loginHandler);
router.post("/register", registerHandler);
// user sent events
router.post("/api/game/:gameID", gameRequestHandler);
router.post("/api/input/:gameID", inputRequestHandler);
// server sent events
router.get("/api/sse/game/:gameID", gameEventHandler);
router.get("/api/sse/input/:gameID", inputEventHandler);

app.use(router.routes());
app.use(authMiddleware);
app.use(staticFileHandler);

await app.listen({ port: parseInt(port) });
