import kaboom from "kaboom";

kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0, 0, 0, 1],
});

const ui = add([
  fixed(),
  z(1),
  color(0, 0, 0),
      width(),
      height(),
]);



const PLAYER_SPEED = 200;

// TODO: add theme music
// ISSUE: loadMusic not defined error
// loadMusic("theme", "music/theme.mp3");
// fix: TBD
loadSprite("tree", "sprites/tree.png");

loadSprite("floor", "sprites/floor-sprites.png", {
  sliceX: 10,
  sliceY: 5
});

loadSprite("player", "sprites/player-m.png", {
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

const forestMap = [
  "************************",
  "************************",
  "************************",
  "*   *              +  *+",
  "*   *   *          +  *+",
  "*   * *    **         *+",
  "*   *  * * + ++  **   *+",
  "*  *+     *        +  *+",
  "*  *  *  *+   *  * +  *+",
  "*  *      *  *    *+  *+",
  "*  * *    +   *+     *+",
  "*  *  +*+   +  +  +  *+",
  "*  *       ** *   +  *+",
  "*  + *    *          *+",
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
  addLevel(forestMap, {
    tileWidth: 256,
    tileHeight: 256,
    tiles: {
      "*": () => [
        sprite("tree"),
        area(),
        body({ isStatic: true }),
      ],
      "+": () => [
        sprite("tree"),
        area(),
        pos(-32, -32),
        body({ isStatic: true }),
      ],
    }
  });
  const player = add([
    sprite("player", { animSpeed: 0.5 }),
    pos(1300, 1480),
    area(),
    body(),
    scale(1.5),
    "player",
  ]);

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
    shake(0.5);
  });

  onCollide("player", "*", () => {
    player.stop();
    shake(0.8);
  });

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
  console.log(c)
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
  onKeyPress("space", () => go("home"));
  onClick(() => go("home"));
});


go("home");

