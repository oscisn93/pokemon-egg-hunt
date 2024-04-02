interface Message {
  socketID: string;
  data: string;
}

// async function handle(conn: Deno.Conn) {
//   const httpConn = Deno.serveHttp(conn);
//   for await (const requestEvent of httpConn) {
//     await requestEvent.respondWith(handleReq(requestEvent));
//   }
// }

// function handleReq(req: Request): Response {
//   const upgrade = req.headers.get("upgrade") || "";
//   if (upgrade.toLowerCase() != "websocket") {
//     return new Response("Not a WebSocket request", { status: 400 });
//   }

//   const { socket, response } = Deno.upgradeWebSocket(req);
//   socket.opopen = () => console.log("socket opened");
//   socket.onmessage = (msg: Message) => { console.log(msg.data)};
//   socket.onerror = (err) => { console.log(err)};
//   socket.onclose = () => console.log("socket closed");
//   return response;
// }

const port = 3000;
const server = Deno.listen({ port });
console.log(`HTTP server running. Access it at: http://localhost:3000/`);

for await (const conn of server) {
  handleHttp(conn).catch(console.error);
}

async function handleHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const dir_path = "/game-client/www/";
    const url = new URL(requestEvent.request.url);
    const filename = url.pathname === "/" ? "index.html" : url.pathname;
    const filepath = `${dir_path}${filename}`;
    console.log(filepath);
    // Try opening the file
    let file;
    try {
      file = await Deno.open("." + filepath, { read: true });
    } catch {
      // If the file cannot be opened, return a "404 Not Found" response
      const notFoundResponse = new Response("404 Not Found", { status: 404 });
      await requestEvent.respondWith(notFoundResponse);
      continue;
    }

    // Build a readable stream so the file doesn't have to be fully loaded into
    // memory while we send it
    const readableStream = file.readable;

    // Build and send the response
    const response = new Response(readableStream);
    await requestEvent.respondWith(response);
  }
}