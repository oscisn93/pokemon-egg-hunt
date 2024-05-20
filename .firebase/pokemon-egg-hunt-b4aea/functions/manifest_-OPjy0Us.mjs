import '@astrojs/internal-helpers/path';
import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_DC_J2cmf.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/register","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/register\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/register.ts","pathname":"/api/auth/register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signin","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signin\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signin.ts","pathname":"/api/auth/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signout.ts","pathname":"/api/auth/signout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/games","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/games\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"games","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/games/index.ts","pathname":"/api/games","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.YXXkc2bg.js"}],"styles":[{"type":"inline","content":"@font-face{font-family:\"Noto Emoji Regular\";src:url(NotoEmoji-Regular.ttf) format(\"truetype\")}body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\";color:#f6f8fa;background-color:#54292e;font-weight:700;box-sizing:border-box;height:100%;padding:0;margin:0}.wrapper{min-height:100%;display:grid;grid-template-rows:auto 1fr auto}.logo-container{display:flex;align-items:center;justify-content:center;margin-bottom:20px}.logo-img{width:568px;margin:2em;margin-bottom:5rem;border-radius:.5em;border:.1em solid rgb(187,16,50)}.signup-container{background-color:#222;border:1px solid #454545;border-radius:.5em;min-width:20%;padding:2em;filter:drop-shadow(0 0 .3em rgb(32,11,15))}h1{text-align:center;font-size:24px;margin-bottom:20px}.form-group{display:flex;flex-direction:column;align-items:center;align-content:center;text-align:left}.form-group input{width:100%;padding:8px;font-size:14px;min-height:3em;border:1px solid #e1e4e8;border-radius:6px;box-sizing:border-box;margin-bottom:1rem;margin-top:1rem}button{background-color:#9b4744;color:#fff;font-size:1em;font-weight:700;border:none;border-radius:6px;padding:10px 20px}button:hover{background-color:#246}#content{display:flex;flex-direction:column;align-items:center;justify-content:center}.game-container{min-width:100%;display:flex;flex-direction:column;align-items:center}#game{min-width:90%;min-height:50em;margin-bottom:20px}footer{text-align:center;min-height:2em;font-size:14px}a{color:#7b8784;text-decoration:none}a:hover{color:#f6f8fa}@media screen and (max-width: 600px){.logo-img{width:90%}}\n"}],"routeData":{"route":"/game","isIndex":false,"type":"page","pattern":"^\\/game\\/?$","segments":[[{"content":"game","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/game.astro","pathname":"/game","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BPvOkGgY.js"}],"styles":[{"type":"inline","content":"@font-face{font-family:\"Noto Emoji Regular\";src:url(NotoEmoji-Regular.ttf) format(\"truetype\")}body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\";color:#f6f8fa;background-color:#54292e;font-weight:700;box-sizing:border-box;height:100%;padding:0;margin:0}.wrapper{min-height:100%;display:grid;grid-template-rows:auto 1fr auto}.logo-container{display:flex;align-items:center;justify-content:center;margin-bottom:20px}.logo-img{width:568px;margin:2em;margin-bottom:5rem;border-radius:.5em;border:.1em solid rgb(187,16,50)}.signup-container{background-color:#222;border:1px solid #454545;border-radius:.5em;min-width:20%;padding:2em;filter:drop-shadow(0 0 .3em rgb(32,11,15))}h1{text-align:center;font-size:24px;margin-bottom:20px}.form-group{display:flex;flex-direction:column;align-items:center;align-content:center;text-align:left}.form-group input{width:100%;padding:8px;font-size:14px;min-height:3em;border:1px solid #e1e4e8;border-radius:6px;box-sizing:border-box;margin-bottom:1rem;margin-top:1rem}button{background-color:#9b4744;color:#fff;font-size:1em;font-weight:700;border:none;border-radius:6px;padding:10px 20px}button:hover{background-color:#246}#content{display:flex;flex-direction:column;align-items:center;justify-content:center}.game-container{min-width:100%;display:flex;flex-direction:column;align-items:center}#game{min-width:90%;min-height:50em;margin-bottom:20px}footer{text-align:center;min-height:2em;font-size:14px}a{color:#7b8784;text-decoration:none}a:hover{color:#f6f8fa}@media screen and (max-width: 600px){.logo-img{width:90%}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/big-o/dev/pokemon-egg-hunt/src/pages/game.astro",{"propagation":"none","containsHead":true}],["/home/big-o/dev/pokemon-egg-hunt/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/index.astro":"chunks/pages/index_C17gQcmw.mjs","/src/pages/api/games/index.ts":"chunks/pages/index_l0sNRNKZ.mjs","/node_modules/astro/dist/assets/endpoint/node.js":"chunks/pages/node_o0b2zMgX.mjs","/src/pages/register.astro":"chunks/pages/register_Cc0w_gSW.mjs","/src/pages/api/auth/register.ts":"chunks/pages/register_BWQijW-9.mjs","/src/pages/api/auth/signin.ts":"chunks/pages/signin_BntoJni9.mjs","/src/pages/api/auth/signout.ts":"chunks/pages/signout_VsDX8-A8.mjs","\u0000@astrojs-manifest":"manifest_-OPjy0Us.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"chunks/node_DoDyVHIG.mjs","\u0000@astro-page:src/pages/api/auth/register@_@ts":"chunks/register_CRCF2_5y.mjs","\u0000@astro-page:src/pages/api/auth/signin@_@ts":"chunks/signin_BjM1LpeE.mjs","\u0000@astro-page:src/pages/api/auth/signout@_@ts":"chunks/signout_Dsl-NvTg.mjs","\u0000@astro-page:src/pages/api/games/index@_@ts":"chunks/index_CSzucbj5.mjs","\u0000@astro-page:src/pages/game@_@astro":"chunks/game_DZfxXT5u.mjs","\u0000@astro-page:src/pages/register@_@astro":"chunks/register_qjl1dEgL.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_-qkNlKRh.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.YXXkc2bg.js","/astro/hoisted.js?q=1":"_astro/hoisted.BPvOkGgY.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/logo.bLKHUpX0.png","/404.html","/favicon.ico","/_astro/hoisted.BPvOkGgY.js","/_astro/hoisted.YXXkc2bg.js"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
