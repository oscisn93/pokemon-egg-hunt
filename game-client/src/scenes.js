import {add, addLevel, area, body, center, color, height, onKeyPress, rect, scale, setBackground, sprite, text, width, z} from './engine.js';

export function homeScene() {
  const c = center();
  setBackground(6, 25, 50);
  const homeButton = add([
    sprite('home-button'),
    pos(0, 0),
    width(),
    height(),
  ]);
  onKeyPress('space', () => {
    go('forest');
  });
}

export function forestScene() {
  //   setBackground(0, 0, 0);
  //   addLevel(forestGroundMap, {
  //     tileWidth: 256,
  //     tileHeight: 256,
  //     tiles: {
  //       '*': () => [rect(256, 256), color(130, 170, 80), z(-1)],
  //       ' ': () =>
  //           [rect(256, 256),
  //            color(217, 145, 83),
  //   ],
  //       '+': () =>
  //           [rect(256, 256),
  //            color(139, 177, 80),
  //   ],
  //     }
  //   });

  //   addLevel(forestMap, {
  //     tileWidth: 256,
  //     tileHeight: 256,
  //     tiles: {
  //       '*': () =>
  //           [sprite('tree'),
  //            area(),
  //            body({isStatic: true}),
  //   ],
  //       '+': () =>
  //           [sprite('tree'),
  //            area(),
  //            body({isStatic: true}),
  //   ],

  //       'a': () =>
  //           [sprite('garden', {frame: 0}),
  //            z(-1),
  //            scale(1.2),
  //   ],
  //       'b': () =>
  //           [sprite('garden', {frame: 1}),
  //            z(-1),
  //            scale(1.2),
  //   ],
  //       'c': () =>
  //           [sprite('garden', {frame: 2}),
  //            z(-1),
  //            scale(1.2),
  //   ],
  //       'd': () =>
  //           [sprite('garden', {frame: 3}),
  //            z(-1),
  //            scale(1.2),
  //   ],
  //       'e': () =>
  //           [sprite('garden', {frame: 4}),
  //            z(-1),
  //            scale(1.2),
  //   ],
  //       'f': () =>
  //           [sprite('garden', {frame: 5}),
  //            z(-1),
  //            scale(1.2),
  //   ],
  //       'g': () =>
  //           [sprite('garden', {frame: 6}),
  //            z(-1),
  //            scale(1.2),
  //   ],
  //       'h': () =>
  //           [sprite('garden', {frame: 7}),
  //            z(-1),
  //            scale(1.2),
  //   ],
  //       'i': () =>
  //           [sprite('garden', {frame: 8}),
  //            z(-1),
  //            scale(1.2),
  //   ]
  //     }
  //   });

  //   // const p1 = add([
  //   //   sprite("player-1", { animSpeed: 0.5 }),
  //   //   pos(1000, 1280),
  //   //   area(),
  //   //   body(),
  //   //   scale(1.5),
  //   //   "player",
  //   // ]);

  //   const fountain = add([
  //     sprite('fountain', {frame: 0, animSpeed: 0.15}),
  //     area(),
  //     pos(512, 760),
  //     scale(4),
  //     body({isStatic: true}),
  //   ]);
  //   fountain.play('run');

  //   const p2 = add([
  //     sprite('player-2', {animSpeed: 0.5}),
  //     pos(1300, 1480),
  //     area(),
  //     body(),
  //     scale(2),
  //     'player',
  //   ]);
  //   const initControls = (player) => {
  //     onKeyDown('left', () => leftDown(player));
  //     onKeyDown('right', () => rightDown(player));
  //     onKeyDown('up', () => upDown(player));
  //     onKeyDown('down', () => downDown(player));

  //     onKeyPress('left', () => leftPress(player));
  //     onKeyPress('right', () => rightPress(player));
  //     onKeyPress('up', () => upPress(player));
  //     onKeyPress('down', () => downPress(player));

  //     onKeyRelease('left', () => leftRelease(player));
  //     onKeyRelease('right', () => rightRelease(player));
  //     onKeyRelease('up', () => upRelease(player));
  //     onKeyRelease('down', () => downRelease(player));

  //     player.onUpdate(() => {
  //       camPos(player.pos);
  //     });

  //     onCollide('player', '+', () => {
  //       player.stop();
  //       shake(0.8);
  //     });

  //     onCollide('player', '*', () => {
  //       player.stop();
  //       shake(0.8);
  //     });
  //   };

  //   // initControls(p1);
  //   initControls(p2);

  //   camScale(0.5);
  console.log('Forest Scene');
}

export function loseScene() {
  const c = center();
  setBackground(6, 25, 50);
  add([
    text('WASTED!'),
    pos(center()),
    anchor('center'),
  ]);
  onKeyPress('space', () => go('home'));
}
