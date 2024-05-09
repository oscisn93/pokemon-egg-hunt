import Engine from "kaboom";

const canvasElement = document.getElementById("game") as HTMLCanvasElement;

const engine = Engine({
  width: 640,
  height: 480,
  scale: 1,
  canvas: canvasElement,
  background: [0, 0, 0, 1],
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
export const scale = engine.scale;
export const pos = engine.pos;
export const loadSprite = engine.loadSprite;
export const onKeyPress = engine.onKeyPress;
export const onKeyRelease = engine.onKeyRelease;
export const onKeyDown = engine.onKeyDown;
export const onCollide = engine.onCollide;
export const onUpdate = engine.onUpdate;
export const mousePos = engine.mousePos;
export const debug = engine.debug;
export const text = engine.text;
export const width = engine.width;
export const height = engine.height;
export const anchor = engine.anchor;
