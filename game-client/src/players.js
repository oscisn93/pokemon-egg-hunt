export const createPlayer = (x, y) => {
  const player = add([
    sprite('player', {
      animSpeed: 0.5,
      frame: 0,
    }),
    pos(x, y),
    origin('center'),
    scale(2),
    body(),
    'player',
  ]);

  const PLAYER_SPEED = 300;
  function leftDown(player) {
    player.move(-PLAYER_SPEED, 0);
  }

  function rightDown(player) {
    player.move(PLAYER_SPEED, 0);
  }

  function upDown(player) {
    player.move(0, -PLAYER_SPEED);
  }

  function downDown(player) {
    player.move(0, PLAYER_SPEED);
  }

  function leftPress(player) {
    player.play('walkLeft');
    player.isAnimated = 'left';
  }

  function rightPress(player) {
    player.play('walkRight');
    player.isAnimated = 'right';
  }

  function upPress(player) {
    player.play('walkUp');
    player.isAnimated = 'up';
  }

  function downPress(player) {
    player.play('walkDown');
    player.isAnimated = 'down';
  }

  function leftRelease(player) {
    player.stop();
    player.frame = 4;
  }

  function rightRelease(player) {
    player.stop();
    player.frame = 8;
  }

  function upRelease(player) {
    player.stop();
    player.frame = 12;
  }

  function downRelease(player) {
    player.stop();
    player.frame = 0;
  }
  return player;
}
