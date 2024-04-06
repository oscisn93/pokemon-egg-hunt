import { Game } from "../client/src/game.ts";

/**
 * The Matchmaker class handles the logic for matching players together.
 */
interface MatchMaker {
  playerQueue: string[];
  gameStore: Record<string, Game>;
}

export class MatchMaker {
  private static instance: MatchMaker;
  private playerQueue!: string[];
  private gameStore!: Record<string, Game>;
  constructor() {
    if (MatchMaker.instance) {
      return MatchMaker.instance;
    }
    MatchMaker.instance = this;
    this.playerQueue = [];
    this.gameStore = {};
  }
}
