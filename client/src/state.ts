import { PlayerEventType } from "./types/enums.ts";
import { Coordinates, SocketID } from "./types/types.ts";

export class StateClient {
  private ws: WebSocket;
  private socketID: SocketID;
  private gameID: string;
  constructor(gameID: string) {
    this.gameID = gameID;
    this.ws = new WebSocket("ws://localhost:3000/ws");
    this.socketID = "";

    this.ws.onopen = () => {
      if (this.socketID) return;
      this.join();
    };
    this.ws.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      if (parsedMessage.type === PlayerEventType.JOIN) {
        this.socketID = parsedMessage.socketID;
        const response = JSON.stringify({
          type: PlayerEventType.JOIN,
          socketID: this.socketID,
          gameID: this.gameID,
        });
        this.ws.send(response);
      }
    };
    this.ws.onclose = () => {
      console.log("Disconnected from server");
    };
  }
  private join() {
    const message = JSON.stringify({
      type: PlayerEventType.JOIN,
      socketID: this.gameID,
    });
    this.ws.send(message);
  }
  private move(pos: Coordinates) {
    const message = JSON.stringify({
      type: PlayerEventType.MOVEMENT,
      socketID: this.socketID,
      gameID: this.gameID,
      pos,
    });
    this.ws.send(message);
  }
}
