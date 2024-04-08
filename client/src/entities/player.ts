import { GameObj } from "npm:kaboom@3000.1.17";
import {
  add,
  anchor,
  area,
  body,
  camPos,
  onKeyDown,
  onKeyRelease,
  onKeyPress,
  onUpdate,
  pos,
  scale,
  shake,
  sprite,
} from "../lib/kaboom.ts";
import {
  PLAYER,
  PLAYER_ANIM_SPEED,
  PLAYER_SCALE,
  PLAYER_SPEED,
} from "../config/constants.ts";
import { PlayerFrame } from "../config/constants.ts";
import { KeyBoardEventType } from "../../../shared/enums.ts";
import { Coordinates } from "../../../shared/types.ts";

export default class Player {
  private gameObject: GameObj;
  private id: string;
  public constructor(id: string, position: Coordinates) {
    this.id = id;
    this.gameObject = this.createGameObject(position.x, position.y);
    onUpdate("player", (obj) => {
      if (this === obj) {
        camPos(this.gameObject.pos);
      }
    });
    this.playerInputConfig();
  }

  private createGameObject(x: number, y: number) {
    return add([
      sprite("gameObject-m", {
        animSpeed: PLAYER_ANIM_SPEED,
        frame: PlayerFrame.DOWN_STANDING,
      }),
      pos(x, y),
      anchor("center"),
      scale(PLAYER_SCALE),
      body(),
      area(),
      PLAYER,
    ]);
  }

  public getID(): string {
    return this.id;
  }

  private leftkeyInputConfig(){
    onKeyPress("left", () => this.playerInputHandler(KeyBoardEventType.LEFT_PRESS));
    onKeyDown("left", () => this.playerInputHandler(KeyBoardEventType.LEFT_DOWN));
    onKeyRelease("left", () => this.playerInputHandler(KeyBoardEventType.LEFT_RELEASE));
  }

  private rightkeyInputConfig(){
    onKeyPress("right", () => this.playerInputHandler(KeyBoardEventType.RIGHT_PRESS));
    onKeyDown("right", () => this.playerInputHandler(KeyBoardEventType.RIGHT_DOWN));
    onKeyRelease("right", () => this.playerInputHandler(KeyBoardEventType.RIGHT_RELEASE));
  }

  private upkeyInputConfig(){
    onKeyPress("up", () => this.playerInputHandler(KeyBoardEventType.UP_PRESS));
    onKeyDown("up", () => this.playerInputHandler(KeyBoardEventType.UP_DOWN));
    onKeyRelease("up", () => this.playerInputHandler(KeyBoardEventType.UP_RELEASE));
  }

  private downkeyInputConfig(){
    onKeyPress("down", () => this.playerInputHandler(KeyBoardEventType.DOWN_PRESS));
    onKeyDown("down", () => this.playerInputHandler(KeyBoardEventType.DOWN_DOWN));
    onKeyRelease("down", () => this.playerInputHandler(KeyBoardEventType.DOWN_RELEASE));
  }

  private playerInputConfig(){
    this.leftkeyInputConfig();
    this.rightkeyInputConfig();
    this.upkeyInputConfig();
    this.downkeyInputConfig();
  }

  private async playerInputHandler(input: string) {
    const response = await fetch(`/player/${this.id}/input`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });
    if (!response.ok) {
      console.error("Error sending player input");
    }
  }

  // handle when the player presses an arrow key
  private leftPressHandler() {
    this.gameObject.stop();
    this.gameObject.play("walkLeft");
  }
  private rightPressHandler() {
    this.gameObject.stop();
    this.gameObject.play("walkRight");
  }
  private upPressHandler() {
    this.gameObject.stop();
    this.gameObject.play("walkUp");
  }
  private downPressHandler() {
    this.gameObject.stop();
    this.gameObject.play("walkDown");
  }
  // handles when the player holds down arrow keys
  private leftDownHandler() {
    // ignore extra keys after a key press records a direction
    if (
      this.gameObject.frame < PlayerFrame.LEFT_STANDING ||
      this.gameObject.frame > PlayerFrame.LEFT_END
    ) {
      return;
    }
    this.gameObject.move(-PLAYER_SPEED, 0);
  }
  private rightDownHandler() {
    // ignore extra keys after a key press records a direction
    if (
      this.gameObject.frame < PlayerFrame.RIGHT_STANDING ||
      this.gameObject.frame > PlayerFrame.RIGHT_END
    ) {
      return;
    }
    this.gameObject.move(PLAYER_SPEED, 0);
  }
  private upDownHandler() {
    // ignore extra keys after a key press records a direction
    if (
      this.gameObject.frame < PlayerFrame.UP_STANDING ||
      this.gameObject.frame > PlayerFrame.UP_END
    ) {
      return;
    }
    this.gameObject.move(0, -PLAYER_SPEED);
  }
  private downDownHandler() {
    // ignore extra keys after a key press records a direction
    if (
      this.gameObject.frame < PlayerFrame.DOWN_STANDING ||
      this.gameObject.frame > PlayerFrame.DOWN_END
    ) {
      return;
    }
    this.gameObject.move(0, PLAYER_SPEED);
  }
  // handle when the player releases an arrow key
  private leftReleaseHandler() {
    this.gameObject.frame = PlayerFrame.LEFT_STANDING;
    this.gameObject.stop();
  }
  private rightReleaseHandler() {
    this.gameObject.frame = PlayerFrame.RIGHT_STANDING;
    this.gameObject.stop();
  }
  private upReleaseHandler() {
    this.gameObject.frame = PlayerFrame.UP_STANDING;
    this.gameObject.stop();
  }
  private downReleaseHandler() {
    this.gameObject.frame = PlayerFrame.DOWN_STANDING;
    this.gameObject.stop();
  }

  public getRemoteInput(input: KeyBoardEventType) {
    switch (input) {
      case KeyBoardEventType.LEFT_PRESS:
        this.leftPressHandler();
        break;
      case KeyBoardEventType.RIGHT_PRESS:
        this.rightPressHandler();
        break;
      case KeyBoardEventType.UP_PRESS:
        this.upPressHandler();
        break;
      case KeyBoardEventType.DOWN_PRESS:
        this.downPressHandler();
        break;
      case KeyBoardEventType.LEFT_DOWN:
        this.leftDownHandler();
        break;
      case KeyBoardEventType.RIGHT_DOWN:
        this.rightDownHandler();
        break;
      case KeyBoardEventType.UP_DOWN:
        this.upDownHandler();
        break;
      case KeyBoardEventType.DOWN_DOWN:
        this.downDownHandler();
        break;
      case KeyBoardEventType.LEFT_RELEASE:
        this.leftReleaseHandler();
        break;
      case KeyBoardEventType.RIGHT_RELEASE:
        this.rightReleaseHandler();
        break;
      case KeyBoardEventType.UP_RELEASE:
        this.upReleaseHandler();
        break;
      case KeyBoardEventType.DOWN_RELEASE:
        this.downReleaseHandler();
        break;
    }
  }

  // a callback to the kaboom onCollision function
  public onCollision() {
    this.gameObject.stop();
    shake(0.8);
  }
}
