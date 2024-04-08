import { loadSprites } from "./config/sprites.ts";
import { homeScene, forestScene, loseScene } from "./config/scenes.ts";
import { go, onCollide, scene } from "./lib/kaboom.ts";
import Player from "./entities/player.ts";
import { TREE, FOUNTAIN, GARDEN } from "./config/constants.ts";
import {
  Coordinates,
  GameEvent,
  KeyBoardEventData,
} from "../../shared/types.ts";
import { GameEventType } from "../../shared/enums.ts";

export class Game {
  private static instance: Game;
  private id!: string;
  private players!: Record<string, Player>;
  private constructor(id: string) {
    Game.instance = this;
    this.id = id;
    this.players = {};
    this.setup();
  }
  public static getInstance(gameID: string): Game {
    if (!Game.instance) {
      Game.instance = new Game(gameID);
    }
    return Game.instance;
  }
  private setup() {
    loadSprites();
    onCollide("player", TREE, (player, _) => {
      player.onCollide();
    });
    onCollide("player", FOUNTAIN, (player, _) => {
      player.onCollide();
    });
    onCollide("player", GARDEN, (player, _) => {
      player.onCollide();
    });
    scene("home", () => homeScene());
    scene("forest", () => forestScene());
    scene("lose", () => loseScene());
  }
  public sendKeyBoardEvent(data: KeyBoardEventData) {
    const playerID = data.playerID;
    const player = this.players[playerID];
    player.getRemoteInput(data.key);
  }

  public onGameEvent(evt: MessageEvent<GameEvent>) {
    const type = evt.type as GameEventType;
    const { playerID, value } = evt.data;
    switch (type) {
      case GameEventType.READY:
        this.start();
        break;
      case GameEventType.JOIN:
        this.addPlayer(playerID as string, value as Coordinates);
        break;
      case GameEventType.LEAVE:
        delete this.players[playerID as string];
        break;
      default:
        break;
    }
  }

  public getID(): string {
    return this.id;
  }

  private start() {
    go("home");
  }
  private addPlayer(playerID: string, position: Coordinates) {
    const player = new Player(playerID, position);
    this.players[player.getID()] = player;
  }
}
