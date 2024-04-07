import { GameObj } from "npm:kaboom@3000.1.17";
import { add, sprite, pos, anchor, scale, body, area } from "../config/engine.ts";
import { EGG } from "../config/constants.ts";
import { Coordinates } from "../types/types.ts";

export default class Egg {
  private gameObject: GameObj;
  public constructor() {
    this.gameObject = add([
      sprite(EGG),
      pos(1300, 1300),
      anchor("center"),
      scale(0.5),
      body(),
      area(),
      "egg",
    ]);
  }
  public spawn() {
    this.gameObject.pos = this.generateSpawnPoint();
  }
  private generateSpawnPoint(): Coordinates {
    let spawnPoint = { x: 0, y: 0 };
    while (!this.isValidSpawnPoint(spawnPoint)) {
      spawnPoint = {
        x: Math.floor(Math.random() * 1000),
        y: Math.floor(Math.random() * 1000),
      };
    }
    return spawnPoint;
  }
  private isValidSpawnPoint(spawnPoint: { x: number; y: number }) {
    if (spawnPoint.x < 0 || spawnPoint.y < 0) {
      return false;
    } else {
      if (spawnPoint.x > 1024 || spawnPoint.y > 1024) {
        return false;
      }
      if (spawnPoint.x < 256 && spawnPoint.y < 256) {
        return false;
      }
    }
    return true;
  }
}
