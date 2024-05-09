import type { Point } from "./types.d.ts";

export class GameState {
  private players: Record<string, string> = {};
  private eggs: Record<string, Point> = {};
  constructor(private gameID: string) {}
}
