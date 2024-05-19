import { GameObj } from "kaboom";

const PLAYER_SPEED = 200;

export function leftDown(player: GameObj) {
  player.move(-PLAYER_SPEED, 0);
}
export function rightDown(player: GameObj) {
  player.move(PLAYER_SPEED, 0);
}
export function upDown(player: GameObj) {
  console.log("upDown");
  player.move(0, -PLAYER_SPEED);
}
export function downDown(player: GameObj) {
  player.move(0, PLAYER_SPEED);
}
export function leftPress(player: GameObj) {
  player.play("walkLeft");
}
export function rightPress(player: GameObj) {
  player.play("walkRight");
}
export function upPress(player: GameObj) {
  player.play("walkUp");
}
export function downPress(player: GameObj) {
  player.play("walkDown");
}
export function leftRelease(player: GameObj) {
  player.stop();
  player.frame = 4;
}
export function rightRelease(player: GameObj) {
  player.stop();
  player.frame = 8;
}
export function upRelease(player: GameObj) {
  player.stop();
  player.frame = 12;
}
export function downRelease(player: GameObj) {
  player.stop();
  player.frame = 0;
}
