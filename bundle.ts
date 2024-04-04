import * as esbuild from "npm:esbuild@0.20.2";
import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.8.5/mod.ts";

await esbuild.build({
  plugins: [...denoPlugins({ configPath: "./deno.json" })],
  entryPoints: ["./game-client/src/main.ts"],
  outdir: "./game-client/static",
  bundle: true,
  platform: "browser",
  format: "esm",
  target: "esnext",
  minify: true,
  sourcemap: true,
  treeShaking: true,
});

esbuild.stop();
