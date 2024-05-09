import fastify from "fastify";
import fastifyWebsocket from "@fastify/websocket";

const server = fastify({ logger: true });

await server.register(fastifyWebsocket);

server.get("/ws", { websocket: true }, (socket, req) => {
  socket.on("message", (msg) => {
    socket.send(msg);
  });
});

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
