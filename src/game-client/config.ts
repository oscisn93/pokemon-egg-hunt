import { Color } from "kaboom";
import { BROWN, DARK_GREEN, GREEN } from "./constants";

type TileConfig = {
  shape?: string;
  color?: Color;
  dimensions?: [number, number];
  depth?: number;
  scale?: number;
  sprite?: {
    name: string;
    frame: number;
  };
  isStatic: boolean;
};

export const TileConfigs: Record<string, TileConfig> = {
  grass: {
    shape: "*",
    color: GREEN,
    dimensions: [256, 256],
    depth: -1,
    isStatic: false,
  },
  dirt: { shape: " ", color: BROWN, dimensions: [256, 256], isStatic: false },
  forest_floor: {
    shape: "+",
    color: DARK_GREEN,
    dimensions: [256, 256],
    isStatic: false,
  },
  tree: { shape: ".", sprite: { name: "tree", frame: -1 }, isStatic: true },
  tree2: { shape: "x", sprite: { name: "tree", frame: -1 }, isStatic: true },
  garden1: { shape: "a", sprite: { name: "garden", frame: 0 }, isStatic: true },
  garden2: { shape: "b", sprite: { name: "garden", frame: 1 }, isStatic: true },
  garden3: { shape: "c", sprite: { name: "garden", frame: 2 }, isStatic: true },
  garden4: { shape: "d", sprite: { name: "garden", frame: 3 }, isStatic: true },
  garden5: { shape: "e", sprite: { name: "garden", frame: 4 }, isStatic: true },
  garden6: { shape: "f", sprite: { name: "garden", frame: 5 }, isStatic: true },
  garden7: { shape: "g", sprite: { name: "garden", frame: 6 }, isStatic: true },
  garden8: { shape: "h", sprite: { name: "garden", frame: 7 }, isStatic: true },
  garden9: { shape: "i", sprite: { name: "garden", frame: 8 }, isStatic: true },
};

export const forestMap = {
    layers: [
      [
        "+++++++++++++++++++++++++",
        "************************+",
        "************************+",
        "*****                 **+",
        "*+++*   *          *  **+",
        "*+++* *    **         **+",
        "*+++*  * * * **  **   **+",
        "*  **     *        *  **+",
        "*  *  *  **   *  * *  **+",
        "*  *      *  *    **  *++",
        "*  * *    *   **     **++",
        "*  *  * *   *  *  *  **+",
        "*  *   *   ** *   *  **+",
        "*  * *    *          **+",
        "*         *      *   **+",
        "*         *  *   *   **+",
        "**      **   **      **+",
        "**  ******  * ** *   **+",
        "**  ******    *  *   **++",
        "**  ******    *      ***+",
        "*       ***          ***+",
        "******  ***      **  ***+",
        "**      ***********  ***+",
        "*   **************  ****+",
        "*****************  ****++",
        "***********************++",
        ],
        [
        "************************",
        "************************",
        "************************",
        "*&  *              +  *+",
        "*abc*   *          +  *+",
        "*def* *    **         *+",
        "*ghi*  * * + ++  **   *+",
        "*  *+     *        +  *+",
        "*  *  *  **   *  * +  *+",
        "*  *      *  *    *+  *+",
        "*  * *    +   *+     *+",
        "*  *  + +   +  +  +  *+",
        "*  *   *   ** *   +  *+",
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
    ]
  ],
};

export function loadAssets(loadSprite: (name: string, path: string, opts?: any) => void): void {
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
}