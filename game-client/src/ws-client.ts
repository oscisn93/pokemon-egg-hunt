import { SocketEventType } from "./enums.ts";
import { Coordinates, SocketID } from "./types.ts";

export class GameClient {
    private ws: WebSocket;
    private socketID: SocketID;
    private gameID: string; 
    constructor(gameID: string) {
      this.gameID = gameID;
      this.ws = new WebSocket("ws://localhost:3000/ws");
      this.socketID = "";

      this.ws.onopen = () => {
        this.ws.send({
          type: "player-join",
          value: this.gameID,
        })
        console.log("Connected to server");
      };
  
      this.ws.onmessage = (message) => {
        console.log("Parsed message:", JSON.parse(message.data));
        const parsedMessage = JSON.parse(message.data);
        if (parsedMessage.type === "set-client-id") {
          this.socketID = parsedMessage.socketID;
        }
      };
  
      this.ws.onclose = () => {
        console.log("Disconnected from server");
      };
    }
    join() {
      const message: GameEvent = {
        type: SocketEventType.PLAYER_JOINED,
        socketID: this.socketID,
      };
      this.ws.send({
        type: "player-join",
        value: this.gameID,
      });
    }
  }
  