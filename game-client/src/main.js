import {loadAssets} from './assets.js';
import {go, scene,} from './engine.js';
import {forestScene, homeScene, loseScene} from './scenes.js';

function main() {
  loadAssets();
  scene('home', () => homeScene());
  scene('forest', () => forestScene());
  scene('lose', () => loseScene());
  go('home');
}
main();