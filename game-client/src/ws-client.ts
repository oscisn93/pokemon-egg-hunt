const ws = new WebSocket("ws://localhost:3000/ws");

let socketID = "";

ws.onopen = () => {
  console.log("Connected to server");
};

ws.onmessage = (message) => {
  console.log("Parsed message:", JSON.parse(message.data));
  const parsedMessage = JSON.parse(message.data);
  if (parsedMessage.type === "set-client-id") {
    socketID = parsedMessage.socketID;
  }
};

ws.onclose = () => {
  console.log("Disconnected from server");
};

const form = document.getElementById("create-player-form") as HTMLFormElement;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const playerNameInputElement = document.getElementById(
    "username"
  ) as HTMLInputElement;
  const playerName = playerNameInputElement?.value;
  const message = {
    type: "create-player",
    socketID: socketID,
    playerName: playerName,
  };
  ws.send(JSON.stringify(message));
});
