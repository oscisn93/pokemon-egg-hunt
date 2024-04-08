import { loadSprite } from "../lib/kaboom.ts";

import {
  HOME_BUTTON,
  TREE,
  FOUNTAIN,
  GARDEN,
  PLAYER_F,
  PLAYER_F2,
  PLAYER_F3,
  PLAYER_F4,
  PLAYER_F5,
  PLAYER_M,
  PLAYER_M2,
  PLAYER_M3,
  PLAYER_M4,
  PLAYER_M5,
  EGG,
  HOME_BUTTON_SPRITE,
  TREE_SPRITE,
  FOUNTAIN_SPRITE,
  GARDEN_SPRITE,
  PLAYER_F_SPRITE,
  PLAYER_F2_SPRITE,
  PLAYER_F3_SPRITE,
  PLAYER_F4_SPRITE,
  PLAYER_F5_SPRITE,
  PLAYER_M_SPRITE,
  PLAYER_M2_SPRITE,
  PLAYER_M3_SPRITE,
  PLAYER_M4_SPRITE,
  PLAYER_M5_SPRITE,
  EGG_SPRITE,
  playerAnimConfig,
  fountainAnimConfig,
} from "./constants.ts";

export const loadSprites = () => {
  // the home button sprite
  loadSprite(HOME_BUTTON, HOME_BUTTON_SPRITE);
  // the tree sprite
  loadSprite(TREE, TREE_SPRITE);
  // the fountain sprite- six frames
  loadSprite(FOUNTAIN, FOUNTAIN_SPRITE, fountainAnimConfig);
  // the mini garden sprite
  loadSprite(GARDEN, GARDEN_SPRITE);
  // the character sprites - four frames for each direction
  loadSprite(PLAYER_F, PLAYER_F_SPRITE, playerAnimConfig);
  loadSprite(PLAYER_F2, PLAYER_F2_SPRITE, playerAnimConfig);
  loadSprite(PLAYER_F3, PLAYER_F3_SPRITE, playerAnimConfig);
  loadSprite(PLAYER_F4, PLAYER_F4_SPRITE, playerAnimConfig);
  loadSprite(PLAYER_F5, PLAYER_F5_SPRITE, playerAnimConfig);
  loadSprite(PLAYER_M, PLAYER_M_SPRITE, playerAnimConfig);
  loadSprite(PLAYER_M2, PLAYER_M2_SPRITE, playerAnimConfig);
  loadSprite(PLAYER_M3, PLAYER_M3_SPRITE, playerAnimConfig);
  loadSprite(PLAYER_M4, PLAYER_M4_SPRITE, playerAnimConfig);
  loadSprite(PLAYER_M5, PLAYER_M5_SPRITE, playerAnimConfig);
  // egg sprites
  loadSprite(EGG, EGG_SPRITE);
};
