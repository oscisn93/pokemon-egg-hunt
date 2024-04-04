import {
  add,
  center,
  anchor,
  pos,
  go,
  height,
  onKeyPress,
  scale,
  setBackground,
  sprite,
  text,
  width,
  addLevel,
  rect,
  area,
  body,
  camScale,
  color,
  z,
  onUpdate,
  onCollide,
} from "./engine.ts";
import { forestMap } from "./maps.ts";
import Player from "./player.ts";

export function homeScene() {
  setBackground(6, 25, 50);
  add([
    sprite("home-button"),
    pos(width() / 2, height() / 2),
    scale(0.5),
    anchor("center"),
  ]);
  onKeyPress("space", () => {
    go("forest");
  });
}

export function forestScene() {
  setBackground(0, 0, 0);
  addLevel(forestMap.layers[0], {
    tileWidth: 256,
    tileHeight: 256,
    tiles: {
      "*": () => [rect(256, 256), color(130, 170, 80), z(-1)],
      " ": () => [rect(256, 256), color(217, 145, 83)],
      "+": () => [rect(256, 256), color(139, 177, 80)],
    },
  });

  addLevel(forestMap.layers[1], {
    tileWidth: 256,
    tileHeight: 256,
    tiles: {
      "*": () => [sprite("tree"), area(), body({ isStatic: true })],
      "+": () => [sprite("tree"), area(), body({ isStatic: true })],

      a: () => [sprite("garden", { frame: 0 }), z(-1), scale(1.2)],
      b: () => [sprite("garden", { frame: 1 }), z(-1), scale(1.2)],
      c: () => [sprite("garden", { frame: 2 }), z(-1), scale(1.2)],
      d: () => [sprite("garden", { frame: 3 }), z(-1), scale(1.2)],
      e: () => [sprite("garden", { frame: 4 }), z(-1), scale(1.2)],
      f: () => [sprite("garden", { frame: 5 }), z(-1), scale(1.2)],
      g: () => [sprite("garden", { frame: 6 }), z(-1), scale(1.2)],
      h: () => [sprite("garden", { frame: 7 }), z(-1), scale(1.2)],
      i: () => [sprite("garden", { frame: 8 }), z(-1), scale(1.2)],
    },
  });
  
  const player = new Player();
  const fountain = add([
    sprite("fountain", { frame: 0, animSpeed: 0.15 }),
    area(),
    pos(512, 760),
    scale(4),
    body({ isStatic: true }),
  ]);
  fountain.play("run");
  onUpdate(() => {
    player.onUpdate();
  });
  onCollide("player", "+", () => player.onCollision());
  onCollide("player", "*", () => player.onCollision());
  camScale(0.5, 0.5);
}

export function loseScene() {
  setBackground(6, 25, 50);
  add([text("WASTED!"), pos(center()), anchor("center")]);
  onKeyPress("space", () => go("home"));
}
