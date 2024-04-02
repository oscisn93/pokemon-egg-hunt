import kaboom from "kaboom";

kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0, 0, 0, 1],
});

const PLAYER_SPEED = 200;

loadSprite("tree", "sprites/tree.png");

loadSprite("floor", "sprites/floor-sprites.png", {
  sliceX: 10,
  sliceY: 5
});

loadSprite("garden", "sprites/garden.png", {
  sliceX:3,
  sliceY: 3
});

loadSprite("player-1", "sprites/player-m.png", {
  sliceX: 4,
  sliceY: 4,
  anims: {
    walkDown: {from: 0, to: 3, loop: true},
    walkLeft: {from: 4, to: 7, loop: true},
    walkRight: {from: 8, to: 11, loop: true},
    walkUp: {from:  12, to: 15, loop: true},
  }
});

loadSprite("player-2", "sprites/player-f.png", {
  sliceX: 4,
  sliceY: 4,
  anims: {
    walkDown: {from: 0, to: 3, loop: true},
    walkLeft: {from: 4, to: 7, loop: true},
    walkRight: {from: 8, to: 11, loop: true},
    walkUp: {from:  12, to: 15, loop: true},
  }
});

function leftDown(player) {
  player.move(-PLAYER_SPEED, 0);
}

function rightDown(player) {
  player.move(PLAYER_SPEED, 0);
}

function upDown(player) {
  player.move(0, -PLAYER_SPEED);
}

function downDown(player) {
  player.move(0, PLAYER_SPEED);
}

function leftPress(player){
  player.play("walkLeft");
  player.isAnimated = 'left';
}

function rightPress(player){
  player.play("walkRight");
  player.isAnimated = 'right';
}

function upPress(player){
  player.play("walkUp");
  player.isAnimated = 'up';
}

function downPress(player){
  player.play("walkDown");
  player.isAnimated = 'down';
}

function leftRelease(player){
  player.stop();
  player.frame = 4;
}

function rightRelease(player){
  player.stop();
  player.frame = 8;
}

function upRelease(player){
  player.stop();
  player.frame = 12;
}

function downRelease(player){
  player.stop();
  player.frame = 0;
}

const forestGroundMap = [
  "+++++++++++++++++++++++++",
  "************************+",
  "************************+",
  "************************+",
  "*+++*              *  **+",
  "*+++*   *          *  **+",
  "*+++* *    **         **+",
  "*+++*  * * * **  **   **+",
  "*  **     *        *  **+",
  "*  *  *  **   *  * *  **+",
  "*  *      *  *    **  *++",
  "*  * *    *   **     **++",
  "*  *  * *   *  *  *  **+",
  "*  *       ** *   *  **+",
  "*  * *    *          **+",
  "*         *      *   **+",
  "*         *  *   *   **+",
  "**      **   **      **+",
  "**  ******  * ** *   **+",
  "**  ******    *  *   **+",
  "**  ******    *      ***+",
  "*       ***          ***+",
  "******  ***      **  ***+",
  "**      ***********  ***+",
  "*   **************  ****+",
  "*****************  ****",
];

const forestMap = [
  "************************",
  "************************",
  "************************",
  "*   *              +  *+",
  "*abc*   *          +  *+",
  "*def* *    **         *+",
  "*ghi*  * * + ++  **   *+",
  "*  *+     *        +  *+",
  "*  *  *  **   *  * +  *+",
  "*  *      *  *    *+  *+",
  "*  * *    +   *+     *+",
  "*  *  +*+   +  +  +  *+",
  "*  *       ** *   +  *+",
  "*  + +    *          *+",
  "*         *      *   *+",
  "*         *  +   +   *+",
  "**      **   *+      *+",
  "**  ******  * ** *   *+",
  "**  ******    *  *   *+",
  "**  ******    *      *++",
  "*+      ***          *++",
  "*+++++  ***      **  *++",
  "*+      ***********  *++",
  "*+  *****++++++++*  *+++",
  "*++*++++       +*  *+++",
];

scene("forest", () => {
  setBackground(0, 0, 0);
  addLevel(forestGroundMap, {
    tileWidth: 256,
    tileHeight: 256,
    tiles: {
      "*": () => [
        rect(256, 256),
        color(130, 170, 80),
        z(-1)
      ],
      " ": () => [
        rect(256, 256),
        color(217, 145, 83),
      ],
      "+": () => [
        rect(256, 256),
        color(139, 177, 80),
      ],
    }
  });

  addLevel(forestMap, {
    tileWidth: 256,
    tileHeight: 256,
    tiles: {
      "*": () => [
      sprite("tree"),
      area(),
      scale(1.2),
      body({ isStatic: true }),
    ],
    "+": () => [
      sprite("tree"),
      area(),
      scale(1.2),
      body({ isStatic: true }),
    ],
    "a": () => [
      sprite("garden", { frame: 0 }),
      z(-1),
      scale(1.2),
    ],
    "b": () => [
      sprite("garden", { frame: 1 }),
      z(-1),
      scale(1.2),
            ],
    "c": () => [
      sprite("garden", { frame: 2 }),
      z(-1),
      scale(1.2),
            ],
    "d": () => [
      sprite("garden", { frame: 3 }),
      z(-1),
      scale(1.2),
            ],
    "e": () => [
      sprite("garden", { frame: 4 }),
      z(-1),
      scale(1.2),
    ],
    "f": () => [
      sprite("garden", { frame: 5 }),
      z(-1),
      scale(1.2),
    ],
    "g": () => [
      sprite("garden", { frame: 6 }),
      z(-1),
      scale(1.2),
    ],
    "h": () => [
      sprite("garden", { frame: 7 }),
      z(-1),
      scale(1.2),
    ],
    "i": () => [
      sprite("garden", { frame: 8 }),
      z(-1),
      scale(1.2),
    ]
    }
  });

  const p1 = add([
    sprite("player-1", { animSpeed: 0.5 }),
    pos(1300, 1480),
    area(),
    body(),
    scale(1.5),
    "player",
  ]);
  const p2 = add([
    sprite("player-2", { animSpeed: 0.5 }),
    pos(1300, 1480),
    area(),
    body(),
    scale(1.5),
    "player",
  ]);
  const initControls = (player) => {
    onKeyDown("left", () => leftDown(player));
    onKeyDown("right", () => rightDown(player));
    onKeyDown("up", () => upDown(player));
    onKeyDown("down", () => downDown(player));

    onKeyPress("left", () => leftPress(player));
    onKeyPress("right", () => rightPress(player));
    onKeyPress("up", () => upPress(player));
    onKeyPress("down", () => downPress(player));

    onKeyRelease("left", () => leftRelease(player));
    onKeyRelease("right", () => rightRelease(player));
    onKeyRelease("up", () => upRelease(player));
    onKeyRelease("down", () => downRelease(player));

    player.onUpdate(() => {
      camPos(player.pos);
    });

    onCollide("player", "+", () => {
      player.stop();
      shake(0.8);
    });

    onCollide("player", "*", () => {
      player.stop();
      shake(0.8);
    });
  };

  initControls(p1);
  initControls(p2);

  camScale(0.5);
});

let c;

scene("home", () => {
  setBackground(0, 0, 0);
  c = center();
  c.x-=200;
  c.y-=100;
  add([
    pos(c),
    rect(500, 200),
    color(255, 100, 100),
  ]);
  add([
    c = center(),
    text("Press SPACE to start"),
    color(255, 255, 255),
    pos(c.x - 180, c.y),
  ]);
  onKeyPress("space", () => {
    go("forest");
  });
});

scene("lose", () => {
  add([
    text("WASTED!"),
    pos(center()),
    anchor("center"),
  ]);
  onKeyPress("space", () => {
    loadMusic("theme", "music/theme.mp3");
    go("home")
  });
  onClick(() => go("home"));
});

go("home");

