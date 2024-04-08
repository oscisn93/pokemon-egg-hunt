import { Coordinates } from "../shared/types.ts";

export default class State {
  private gameID: string;
  private players: Record<string, Coordinates>;
  private eggs: Record<string, Coordinates>;
  constructor(gameID: string) {
    this.gameID = gameID;
    this.players = {};
    this.eggs = {};
  }
  public getGameID(): string {
    return this.gameID;
  }
  public getPlayers(): Record<string, Coordinates> {
    return this.players;
  }
  public getEggs(): Record<string, Coordinates> {
    return this.eggs;
  }
}
