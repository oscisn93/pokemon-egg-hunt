import {  loadSprites } from "./config/sprites.ts";
import { homeScene, forestScene, loseScene } from "./config/scenes.ts";
import { StateClient } from "./state.ts";
import { go, scene } from "./config/engine.ts";

export class Game {
  private static instance: Game;
  private gameID!: string;
  private gameEventClient!: StateClient;
  constructor(gameID: string) {
    if (Game.instance) {
      return Game.instance;
    }
    Game.instance = this;
    this.gameID = gameID;
    this.gameEventClient = new StateClient(gameID);
    this.setup();
  }
  public getGameID(): string {
    return this.gameID;
  }
  private setup() {
    loadSprites();
    scene("home", () => homeScene());
    scene("forest", () => forestScene());
    scene("lose", () => loseScene());
  }
  public start() {
    go("home");
  }
}
