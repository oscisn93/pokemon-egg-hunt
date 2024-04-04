import { GameObj } from "npm:kaboom@3000.1.17";
import { add, body, anchor, pos, scale, sprite } from "./engine.ts";

/** wrapt the kaboom gameobject with some handlers for
 * player movement based on keypresses and releases
 */
export class Player {
  private PLAYER_SPEED = 300;
  private player: GameObj;
  private x: number;
  private y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.player = add([
      sprite("player", {
        animSpeed: 0.5,
        frame: 0,
      }),
      pos(x, y),
      anchor("center"),
      scale(2),
      body(),
      "player",
    ]);
  }
  leftDown() {
    this.player.move(-this.PLAYER_SPEED, 0);
  }
  rightDown() {
    this.player.move(this.PLAYER_SPEED, 0);
  }
  upDown() {
    this.player.move(0, -this.PLAYER_SPEED);
  }
  downDown() {
    this.player.move(0, this.PLAYER_SPEED);
  }
  leftPress() {
    this.player.play("walkLeft");
  }
  rightPress() {
    this.player.play("walkRight");
  }
  upPress() {
    this.player.play("walkUp");
  }
  downPress() {
    this.player.play("walkDown");
  }
  leftRelease() {
    this.player.stop();
    this.player.frame = 4;
  }
  rightRelease() {
    this.player.stop();
    this.player.frame = 8;
  }
  upRelease() {
    this.player.stop();
    this.player.frame = 12;
  }
  downRelease() {
    this.player.stop();
    this.player.frame = 0;
  }
}
