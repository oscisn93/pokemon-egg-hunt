export enum GameEventType {
  JOIN = "join",
  READY = "ready",
  LEAVE = "leave",
}

export enum PokemonEggStatus {
  HIDDEN,
  VISIBLE,
  HATCHED,
  FOUND,
}

export enum PlayerEventType {
  READY,
  JOIN,
  IDLE,
  LEAVE,
  MOVEMENT,
  COLLISSION,
}

export enum KeyBoardEventType {
  LEFT_PRESS = "left",
  RIGHT_PRESS = "right",
  UP_PRESS = "up",
  DOWN_PRESS = "down",
  LEFT_RELEASE = "leftRelease",
  RIGHT_RELEASE = "rightRelease",
  UP_RELEASE = "upRelease",
  DOWN_RELEASE = "downRelease",
  LEFT_DOWN = "leftDown",
  RIGHT_DOWN = "rightDown",
  UP_DOWN = "upDown",
  DOWN_DOWN = "downDown",
}