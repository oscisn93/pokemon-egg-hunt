import { loadSprites } from "./config/sprites.ts";
import { homeScene, forestScene, loseScene } from "./config/scenes.ts";
import { go, onCollide, scene } from "./lib/kaboom.ts";
import Player from "./entities/player.ts";
import { TREE, FOUNTAIN, GARDEN } from "./config/constants.ts";
import {
  InputEventData,
  GameEventType,
  GameEventData,
} from "../../shared/types.ts";

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
  public sendKeyBoardEvent(data: InputEventData) {
    const playerID = data.playerID;
    const player = this.players[playerID];
    player.getRemoteInput(data.key);
  }

  public onGameEvent(evt: MessageEvent<GameEventData>) {
    const type = evt.type as GameEventType;
    const playerID = evt.data.playerID;
    switch (type) {
      case "join":
        this.start();
        break;
      case "ready":
        this.addPlayer(playerID as string);
        break;
      case "leave":
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
  private addPlayer(playerID: string) {
    const player = new Player(playerID, { x: 0, y: 0 });
    this.players[player.getID()] = player;
  }
}
/**
 * When a player logs in they will be put into a queue
 * until there's at least two players in the queue.
 * Once there are two players in the queue, the server
 * will create a new GameStatus object which will create
 * a new Game object, and update the player's screens
 * and prompt thme to join the game.
 * 
 * api specifcation:
 * 
 * POST /login (username, password) -> HTML(matches.html)
 *   auth cookie is set and required for all other requests
 *   sends a message to add the player to the queue
 * 
 * POST /logout () -> HTML(index.html)
 *   auth cookie is cleared
 *   sends a message to remove the player from the queue
 *
 * GET /statuses -> GameEvent
 *   subscribes to the game event source
 *   each time a player joins, leaves, or is ready
 *   the client will update the ui
 * 
 * POST /join (GameEvent) -> HTML(game.html)
 *   sends a message to the server to join the game
 *   the server will take the player out of the  queue
 *   and update the GameStatus object. The server will
 *   the send the game.html file to the client, along with the gameID
 * 
 * GET /inputs/:gameID -> InputEvent
 *   subscribes to the input event source
 *   each time a player sends an input event, the client will
 *   update the game state on the next frame.
 * 
 * POST /inputs/:gameID (InputEvent) -> 200
 *   sends a message to the server with the input event
 *   the server will update the game state and send a 200 response
 * 
 */
