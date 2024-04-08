import { bgGreen } from "https://deno.land/std@0.221.0/fmt/colors.ts";

import {
  Application,
  Router,
} from "https://deno.land/x/oak@14.2.0/mod.ts";

import { authRequestHandler, staticFileHandler } from "./api.ts";

const port = Deno.env.get("PORT") || "3000";
const app = new Application();
const router = new Router();

router.post("/api/auth/", authRequestHandler);
app.use(router.routes());
app.use(staticFileHandler);

console.log(bgGreen(`Server is running on http://localhost:${port}`));

await app.listen({ port: parseInt(port) });
