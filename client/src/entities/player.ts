import { GameObj } from "npm:kaboom@3000.1.17";
import {
  add,
  anchor,
  area,
  body,
  camPos,
  onKeyDown,
  onKeyPress,
  onKeyRelease,
  onUpdate,
  pos,
  scale,
  shake,
  sprite,
} from "./engine.ts";
import { Coordinates } from "./types.ts";

export default class Player {
  private gameObject: GameObj;
  private eggs: PokemonEgg[] = [];
  private status: PlayerStatus = PlayerStatus.IDLE;
  public constructor() {
    this.gameObject = add([
      sprite("gameObject-m", {
        animSpeed: PLAYER_ANIM_SPEED,
        frame: 0,
      }),
      pos(1300, 1300),
      anchor("center"),
      scale(PLAYER_SCALE),
      body(),
      area(),
      "player",
    ]);
    this.initControls();
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

  private initControls() {
    onKeyDown("left", () => this.gameObject.move(-PLAYER_SPEED, 0));
    onKeyDown("right", () => this.gameObject.move(PLAYER_SPEED, 0));
    onKeyDown("up", () => this.gameObject.move(0, -PLAYER_SPEED));
    onKeyDown("down", () => this.gameObject.move(0, PLAYER_SPEED));

    onKeyPress("left", () => {
      this.gameObject.stop();
      this.gameObject.play("walkLeft")
    });
    onKeyPress("right", () => {
      this.gameObject.stop();
      this.gameObject.play("walkRight")
    });
    onKeyPress("up", () => {
      this.gameObject.stop();
      this.gameObject.play("walkUp")
    });
    onKeyPress("down", () => {
      this.gameObject.stop();
      this.gameObject.play("walkDown")
      });

    onKeyRelease("left", () => {
      this.gameObject.stop();
      this.gameObject.frame = 4;
    });

    onKeyRelease("right", () => {
      this.gameObject.stop();
      this.gameObject.frame = 8;
    });

    onKeyRelease("up", () => {
      this.gameObject.stop();
      this.gameObject.frame = 12;
    });

    onKeyRelease("down", () => {
      this.gameObject.stop();
      this.gameObject.frame = 0;
    });
    onUpdate(() => {
      camPos(this.gameObject.pos);
    });
  }

  public onUpdate() {
    camPos(this.gameObject.pos);
  }

  public onCollision() {
    this.gameObject.stop();
    shake(0.8);
  }
}
