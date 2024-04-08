import KaboomContext from "npm:kaboom@3000.1.17";

const canvasElement = document.getElementById("game") as HTMLCanvasElement;

const context = KaboomContext({
  width: 640,
  height: 480,
  scale: 1,
  canvas: canvasElement,
  background: [0, 0, 0, 1],
});

export const scene = context.scene;
export const go = context.go;
export const shake = context.shake;
export const camPos = context.camPos;
export const camScale = context.camScale;
export const setBackground = context.setBackground;
export const addLevel = context.addLevel;
export const center = context.center;
export const rect = context.rect;
export const color = context.color;
export const z = context.z;
export const add = context.add;
export const sprite = context.sprite;
export const area = context.area;
export const body = context.body;
export const scale = context.scale;
export const pos = context.pos;
export const loadSprite = context.loadSprite;
export const onKeyPress = context.onKeyPress;
export const onKeyRelease = context.onKeyRelease;
export const onKeyDown = context.onKeyDown;
export const onCollide = context.onCollide;
export const onUpdate = context.onUpdate;
export const mousePos = context.mousePos;
export const debug = context.debug;
export const text = context.text;
export const width = context.width;
export const height = context.height;
export const anchor = context.anchor;
