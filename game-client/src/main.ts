import {loadAssets} from './assets.ts';
import {go, scene,} from './engine.ts';
import {forestScene, homeScene, loseScene} from './scenes.ts';

function main() {
  loadAssets();
  scene('home', () => homeScene());
  scene('forest', () => forestScene());
  scene('lose', () => loseScene());
  go('home');
}

main();