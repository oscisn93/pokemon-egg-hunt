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
export async function authUser(ctx: Context, store: KVNamespace) {
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

export async function getGameEventSource(ctx: Context) {
  const target = ctx.sendEvents();
  const userID = v1.generate() as string;
  const gameEvent = new ServerSentEvent({
    type: GameEventTypes.USER_JOINED,
    data: JSON.stringify({ userID }),
    eventInit: { id: v1.generate() },
  })
  target.dispatchEvent(gameEvent);
  target.addEventListener("close", () => {
    console.log("Event stream closed");
  }
}
