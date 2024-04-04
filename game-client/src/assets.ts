import {loadSprite} from './engine.ts';

export function loadAssets() {
  // the home button sprite
  loadSprite('home-button', 'sprites/home-button.png');
  // the tree sprite
  loadSprite('tree', 'sprites/tree.png');
  // the fountain sprite- six frames
  loadSprite('fountain', 'sprites/fountain.png', {
    sliceX: 2,
    sliceY: 3,
    anims: {
      run: {from: 0, to: 5, loop: true},
    }
  });
  /** May use these for the stairs if I have time for additional levels */
  // loadSprite("floor", "sprites/floor-sprites.png", {
  //   sliceX: 10,
  //   sliceY: 5
  // });
  // the mini garden sprite
  loadSprite('garden', 'sprites/garden.png', {sliceX: 3, sliceY: 3});
  // the character sprites - four frames for each direction
  // firered/leafgreen player
  loadSprite('player-m', 'sprites/player-m.png', {
    sliceX: 4,
    sliceY: 4,
    anims: {
      walkDown: {from: 0, to: 3, loop: true},
      walkLeft: {from: 4, to: 7, loop: true},
      walkRight: {from: 8, to: 11, loop: true},
      walkUp: {from: 12, to: 15, loop: true},
    }
  });
  // sidney (Hoenn elite four)
  loadSprite('player-m2', 'sprites/player-m2.png', {
    sliceX: 4,
    sliceY: 4,
    anims: {
      walkDown: {from: 0, to: 3, loop: true},
      walkLeft: {from: 4, to: 7, loop: true},
      walkRight: {from: 8, to: 11, loop: true},
      walkUp: {from: 12, to: 15, loop: true},
    }
  });
  // dawn (Sinnoh)
  loadSprite('player-f2', 'sprites/player-f2.png', {
    sliceX: 4,
    sliceY: 4,
    anims: {
      walkDown: {from: 0, to: 3, loop: true},
      walkLeft: {from: 4, to: 7, loop: true},
      walkRight: {from: 8, to: 11, loop: true},
      walkUp: {from: 12, to: 15, loop: true},
    }
  });
  // Amy? (idk, got if off Pinterest)
  loadSprite('player-f', 'sprites/player-f.png', {
    sliceX: 4,
    sliceY: 4,
    anims: {
      walkDown: {from: 0, to: 3, loop: true},
      walkLeft: {from: 4, to: 7, loop: true},
      walkRight: {from: 8, to: 11, loop: true},
      walkUp: {from: 12, to: 15, loop: true},
    }
  });
};
