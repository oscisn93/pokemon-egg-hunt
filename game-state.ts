import { Vec2 } from "./types.d.ts";

export class GameState {
  private players: Record<string, string> = {};
  private eggs: Record<string, Vec2> = {};
  constructor(private gameID: string) {}
}
