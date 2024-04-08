import {  KeyBoardEventData } from "../../shared/types.ts";
import { Game } from "./game.ts";

export class GameState {
  public static instance: GameState;
  private eventSource: EventSource;
  private game: Game;
  private constructor(gameID: string) {
    this.game = Game.getInstance(gameID);
    this.eventSource = new EventSource(`/events/${gameID}`, {
      withCredentials: true,
    });
    this.eventSource.addEventListener("game", (event) => {
      this.game.onGameEvent(event);
    });
    this.eventSource.addEventListener("keyboard", (event) => {
      const keyboardEvent: KeyBoardEventData = JSON.parse(event.data);
      this.game.sendKeyBoardEvent(keyboardEvent);
    });
    GameState.instance = this;
  }

  public static getInstance(gameID: string): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState(gameID);
    }
    return GameState.instance;
  }
}
