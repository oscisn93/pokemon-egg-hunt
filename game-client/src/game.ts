import { loadAssets } from "./assets.ts";
import { go, scene } from "./engine.ts";
import { WebSocketClient } from "./ws-client.ts";
import { forestScene, homeScene, loseScene } from "./scenes.ts";

export class Game {
  private static instance: Game;
  private gameID!: string;
  private gameEventClient!: WebSocketClient;
  constructor(gameID: string) {
    if (Game.instance) {
      return Game.instance;
    }
    Game.instance = this;
    this.gameID = gameID;
    this.gameEventClient = new WebSocketClient();
    this.setup();
  }
  public getGameID(): string {
    return this.gameID;
  }
  private setup() {
    loadAssets();
    scene("home", () => homeScene());
    scene("forest", () => forestScene());
    scene("lose", () => loseScene());
  }
  public start() {

    go("home");
    
  }
}
