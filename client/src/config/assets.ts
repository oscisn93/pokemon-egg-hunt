import { loadSprite } from "./engine.ts";
import {
  CHARACTER_F,
  CHARACTER_F2,
  CHARACTER_F3,
  CHARACTER_F4,
  CHARACTER_F5,
  CHARACTER_M,
  CHARACTER_M2,
  CHARACTER_M3,
  CHARACTER_M4,
  CHARACTER_M5,
  FOUNTAIN,
  GARDEN,
  HOME_BUTTON,
  TREE,
  CHARACTER_F_SPRITE,
  CHARACTER_F2_SPRITE,
  CHARACTER_F3_SPRITE,
  CHARACTER_F4_SPRITE,
  CHARACTER_F5_SPRITE,
  CHARACTER_M_SPRITE,
  CHARACTER_M2_SPRITE,
  CHARACTER_M3_SPRITE,
  CHARACTER_M4_SPRITE,
  CHARACTER_M5_SPRITE,
  FOUNTAIN_SPRITE,
  GARDEN_SPRITE,
  HOME_BUTTON_SPRITE,
  TREE_SPRITE,
} from "./contstants.ts";

export function loadSprites() {
  // the home button sprite
  loadSprite(HOME_BUTTON, HOME_BUTTON_SPRITE);
  // the tree sprite
  loadSprite(TREE, TREE_SPRITE);
  // the fountain sprite- six frames

  loadSprite(FOUNTAIN, FOUNTAIN_SPRITE, fountainConfig);
  // the mini garden sprite
  loadSprite(GARDEN, GARDEN_SPRITE);
  // the character sprites - four frames for each direction
  // firered/leafgreen player

  loadSprite(CHARACTER_M, CHARACTER_M_SPRITE, playerConfig);
  loadSprite(CHARACTER_M2, CHARACTER_M2_SPRITE, playerConfig);
  loadSprite(CHARACTER_M3, CHARACTER_M3_SPRITE, playerConfig);
  loadSprite(CHARACTER_M4, CHARACTER_M4_SPRITE, playerConfig);
  loadSprite(CHARACTER_M5, CHARACTER_M5_SPRITE, playerConfig);
  loadSprite(CHARACTER_F, CHARACTER_F_SPRITE, playerConfig);
  loadSprite(CHARACTER_F2, CHARACTER_F2_SPRITE, playerConfig);
  loadSprite(CHARACTER_F3, CHARACTER_F3_SPRITE, playerConfig);
  loadSprite(CHARACTER_F4, CHARACTER_F4_SPRITE, playerConfig);
  loadSprite(CHARACTER_F5, CHARACTER_F5_SPRITE, playerConfig);
}
