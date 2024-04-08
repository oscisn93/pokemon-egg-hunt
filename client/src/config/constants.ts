// Game constants
export const PLAYER_SPEED = 300;
export const PLAYER_ANIM_SPEED = 0.5;
export const PLAYER_SCALE = 2;
// static game objects sprites
export const HOME_BUTTON = "home-button";
export const HOME_BUTTON_SPRITE = "sprites/home-button.png";
export const EGG = "egg";
export const EGG_SPRITE = "sprites/egg.png";
export const TREE = "tree";
export const TREE_SPRITE = "sprites/tree.png";
export const FOUNTAIN = "fountain";
export const FOUNTAIN_SPRITE = "sprites/fountain.png";
export const GARDEN = "garden";
export const GARDEN_SPRITE = "sprites/garden.png";
// player sprites
export const PLAYER = "player";
export const PLAYER_F = "player-f";
export const PLAYER_F_SPRITE = "sprites/player-f.png";
export const PLAYER_F2 = "player-f2";
export const PLAYER_F2_SPRITE = "sprites/player-f2.png";
export const PLAYER_F3 = "player-f3";
export const PLAYER_F3_SPRITE = "sprites/player-f3.png";
export const PLAYER_F4 = "player-f4";
export const PLAYER_F4_SPRITE = "sprites/player-f4.png";
export const PLAYER_F5 = "player-f5";
export const PLAYER_F5_SPRITE = "sprites/player-f5.png";
export const PLAYER_M = "player-m";
export const PLAYER_M_SPRITE = "sprites/player-m.png";
export const PLAYER_M2 = "player-m2";
export const PLAYER_M2_SPRITE = "sprites/player-m2.png";
export const PLAYER_M3 = "player-m3";
export const PLAYER_M3_SPRITE = "sprites/player-m3.png";
export const PLAYER_M4 = "player-m4";
export const PLAYER_M4_SPRITE = "sprites/player-m4.png";
export const PLAYER_M5 = "player-m5";
export const PLAYER_M5_SPRITE = "sprites/player-m5.png";
// sprite animation configurations
export enum PlayerFrame {
  DOWN_STANDING = 0,
  DOWN_START = 1,
  DOWN_MIDDLE = 2,
  DOWN_END = 3,
  LEFT_STANDING = 4,
  LEFT_START = 5,
  LEFT_MIDDLE = 6,
  LEFT_END = 7,
  RIGHT_STANDING = 8,
  RIGHT_START = 9,
  RIGHT_MIDDLE = 10,
  RIGHT_END = 11,
  UP_STANDING = 12,
  UP_START = 13,
  UP_MIDDLE = 14,
  UP_END = 15,
}
export const playerAnimConfig = {
  sliceX: 4,
  sliceY: 4,
  anims: {
    walkDown: {
      from: PlayerFrame.DOWN_START,
      to: PlayerFrame.DOWN_END,
      loop: true
    },
    walkLeft: {
      from: PlayerFrame.LEFT_START,
      to: PlayerFrame.LEFT_END,
      loop: true
    },
    walkRight: {
      from: PlayerFrame.RIGHT_START,
      to: PlayerFrame.RIGHT_END,
      loop: true
    },
    walkUp: {
      from: PlayerFrame.UP_START,
      to: PlayerFrame.UP_END,
      loop: true
    },
  },
};
export const fountainAnimConfig = {
  sliceX: 2,
  sliceY: 3,
  anims: {
    run: { from: 0, to: 5, loop: true },
  },
};