

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
    loadAssets();
    scene("home", () => homeScene());
    scene("forest", () => forestScene());
    scene("lose", () => loseScene());
  }
  public start() {
    go("home");
  }
}
