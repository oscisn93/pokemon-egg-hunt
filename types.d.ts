export type Point = {
  x: number;
  y: number;
};

export type SocketID = string;

export enum SocketEventType {
  PLAYER_JOINED = "player-joined",
  PLAYER_LEFT = "player-left",
  PLAYER_MOVED = "player-moved",
  PLAYER_DIED = "player-died",
  PLAYER_SCORED = "player-scored",
  EGG_COLLECTED = "egg-collected",
  EGG_HATCHED = "egg-hatched",
  GAME_OVER = "game-over",
  GAME_START = "game-start",
}

export interface SocketEventMessage {
  type: SocketEventType;
  socketID: SocketID;
  value?: number | string | Point;
}

type GameLobby = {
  gameID: string;
  players: string[];
  readyPlayers: Set<string>;
};