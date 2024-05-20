import {loadAssets} from './config';
import {Game} from './game'
import type { KaboomCtx, GameObj } from 'kaboom';
import { forestMap } from "./config.ts";
import {
  downDown,
  downPress,
  downRelease,
  leftDown,
  leftPress,
  leftRelease,
  rightDown,
  rightPress,
  rightRelease,
  upDown,
  upPress,
  upRelease,
} from "./players.ts";

export class World implements Game {
  private engine: KaboomCtx;
  constructor(engine: KaboomCtx) {
    this.engine = engine;
    loadAssets(engine.loadSprite);
    engine.scene('home', () => this.homeScene());
    engine.scene('forest', () => this.forestScene());
    engine.scene('lose', () => this.loseScene());
    engine.go('home');
  }
  private homeScene() {
 this.engine.setBackground(6, 25, 50);
  this.engine.add([
    this.engine.sprite("home-button"),
    this.engine.pos(this.engine.width() / 2, this.engine.height() / 2),
    this.engine.scale(0.5),
    this.engine.anchor("center"),
  ]);
  this.engine.onKeyPress("space", () => {
    this.engine.go("forest");
  });
}

private forestScene() {
  this.engine.setBackground(0, 0, 0);
  this.engine.addLevel(forestMap.layers[0], {
    tileWidth: 256,
    tileHeight: 256,
    tiles: {
      "*": () => [this.engine.rect(256, 256), this.engine.color(130, 170, 80), this.engine.z(-1)],
      " ": () => [this.engine.rect(256, 256), this.engine.color(217, 145, 83)],
      "+": () => [this.engine.rect(256, 256), this.engine.color(139, 177, 80)],
    },
  });

  this.engine.addLevel(forestMap.layers[1], {
    tileWidth: 256,
    tileHeight: 256,
    tiles: {
      "*": () => [this.engine.sprite("tree"), this.engine.area(), this.engine.body({ isStatic: true })],
      "+": () => [this.engine.sprite("tree"), this.engine.area(), this.engine.body({ isStatic: true })],

      a: () => [this.engine.sprite("garden", { frame: 0 }), this.engine.z(-1), this.engine.scale(1.2)],
      b: () => [this.engine.sprite("garden", { frame: 1 }), this.engine.z(-1), this.engine.scale(1.2)],
      c: () => [this.engine.sprite("garden", { frame: 2 }), this.engine.z(-1), this.engine.scale(1.2)],
      d: () => [this.engine.sprite("garden", { frame: 3 }), this.engine.z(-1), this.engine.scale(1.2)],
      e: () => [this.engine.sprite("garden", { frame: 4 }), this.engine.z(-1), this.engine.scale(1.2)],
      f: () => [this.engine.sprite("garden", { frame: 5 }), this.engine.z(-1), this.engine.scale(1.2)],
      g: () => [this.engine.sprite("garden", { frame: 6 }), this.engine.z(-1), this.engine.scale(1.2)],
      h: () => [this.engine.sprite("garden", { frame: 7 }), this.engine.z(-1), this.engine.scale(1.2)],
      i: () => [this.engine.sprite("garden", { frame: 8 }), this.engine.z(-1), this.engine.scale(1.2)],
    },
  });
  const p1 = this.engine.add([
    this.engine.sprite("player-m", {
      animSpeed: 0.5,
      frame: 0,
    }),
    this.engine.pos(1300, 1300),
    this.engine.anchor("center"),
    this.engine.scale(2),
    this.engine.body(),
    this.engine.area(),
    "player",
  ]);
  console.log(p1);

  const fountain = this.engine.add([
    this.engine.sprite("fountain", { frame: 0, animSpeed: 0.15 }),
    this.engine.area(),
    this.engine.pos(512, 760),
    this.engine.scale(4),
    this.engine.body({ isStatic: true }),
  ]);
  fountain.play("run");

  const initControls = (player: GameObj) => {
    this.engine.onKeyDown("left", () => leftDown(player));
    this.engine.onKeyDown("right", () => rightDown(player));
    this.engine.onKeyDown("up", () => upDown(player));
    this.engine.onKeyDown("down", () => downDown(player));

    this.engine.onKeyPress("left", () => leftPress(player));
    this.engine.onKeyPress("right", () => rightPress(player));
    this.engine.onKeyPress("up", () => upPress(player));
    this.engine.onKeyPress("down", () => downPress(player));

    this.engine.onKeyRelease("left", () => leftRelease(player));
    this.engine.onKeyRelease("right", () => rightRelease(player));
    this.engine.onKeyRelease("up", () => upRelease(player));
    this.engine.onKeyRelease("down", () => downRelease(player));

    this.engine.onUpdate(() => {
      this.engine.camPos(player.pos);
    });
    this.engine.onCollide("player", "+", () => {
      player.stop();
      this.engine.shake(0.8);
    });

    this.engine.onCollide("player", "*", () => {
      player.stop();
      this.engine.shake(0.8);
    });
  };

  initControls(p1);
  // @ts-ignore: camScale 
  camScale(0.5, 0.5);
}

private loseScene() {
  this.engine.setBackground(6, 25, 50);
  this.engine.add([this.engine.text("WASTED!"), this.engine.pos(this.engine.center()), this.engine.anchor("center")]);
  this.engine.onKeyPress("space", () => this.engine.go("home"));
}
  public actions(state: { to_move: number; utility: number; board: string[]; moves: { type: string; data: any; }[]; }): { type: string; data: any; }[] {
    throw new Error('Method not implemented.');
  }
  public result(state: { to_move: number; utility: number; board: string[]; moves: { type: string; data: any; }[]; }, move: { type: string; data: any; }): { to_move: number; utility: number; board: string[]; moves: { type: string; data: any; }[]; } {
    throw new Error('Method not implemented.');
  }
  public utility(state: { to_move: number; utility: number; board: string[]; moves: { type: string; data: any; }[]; }, player: number): number {
    throw new Error('Method not implemented.');
  }
  public terminal(state: { to_move: number; utility: number; board: string[]; moves: { type: string; data: any; }[]; }): boolean {
    throw new Error('Method not implemented.');
  }
  public to_move(state: { to_move: number; utility: number; board: string[]; moves: { type: string; data: any; }[]; }): number {
    throw new Error('Method not implemented.');
  }
  public display(state: { to_move: number; utility: number; board: string[]; moves: { type: string; data: any; }[]; }): void {
    throw new Error('Method not implemented.');
  }
  public play(players: (state: { to_move: number; utility: number; board: string[]; moves: { type: string; data: any; }[]; }) => { type: string; data: any; }): void {
    throw new Error('Method not implemented.');
  }
}