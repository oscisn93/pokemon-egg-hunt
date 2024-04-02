import kaboom from 'kaboom';

const engine = kaboom({
  global: true,
  canvas: document.getElementById('game'),
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0, 0, 0, 1],
});

export const scene = engine.scene;
export const go = engine.go;
export const shake = engine.shake;
export const camPos = engine.camPos;
export const camScale = engine.camScale;
export const setBackground = engine.setBackground;
export const addLevel = engine.addLevel;
export const center = engine.center;
export const rect = engine.rect;
export const color = engine.color;
export const z = engine.z;
export const add = engine.add;
export const sprite = engine.sprite;
export const area = engine.area;
export const body = engine.body;
export const origin = engine.origin;
export const scale = engine.scale;
export const pos = engine.pos;
export const loadSprite = engine.loadSprite;
export const action = engine.action;
export const onKeyPress = engine.onKeyPress;
export const onKeyRelease = engine.onKeyRelease;
export const onKeyDown = engine.onKeyDown;
export const onCollide = engine.onCollide;
export const mousePos = engine.mousePos;
export const debug = engine.debug;
export const text = engine.text;
export const width = engine.width;
export const height = engine.height;
