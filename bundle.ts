import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.8.5/mod.ts";
import { load } from "https://deno.land/std@0.221.0/dotenv/mod.ts";

import { BuildOptions, context, build, stop } from "npm:esbuild@0.20.2";

await load({
  envPath: "./.env",
  export: true,
});

const env = Deno.env.get("DENO_ENV");

const buildOptions: BuildOptions = {
  plugins: [...denoPlugins({ configPath: "./deno.json" })],
  entryPoints: ["./game-client/src/index.ts"],
  outdir: "./dist",
  bundle: true,
  platform: "browser",
  format: "esm",
  target: "esnext",
  minify: true,
  sourcemap: true,
  treeShaking: true,
}

if (env === "DEVELOPMENT") {
  const ctx = await context(buildOptions);
  await ctx.watch();
} else {
  await build(buildOptions);
  stop();
}
