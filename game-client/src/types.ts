import { SocketEventType } from "./enums.ts";

export type Coordinates = {
  x: number;
  y: number;
};

export type SocketID = string;

export interface ServerOptions {
  port: number;
}

export interface PingMessage {
  type: GameEventMessage;
  gameID: string;
}

export interface GameEvent {
  type: GameEventType;
  socketID?: SocketID;
  value?: number | string | Coordinates;
}

export type GameLobby = {
  gameID: string;
  players: string[];
  readyPlayers: Set<string>;
};
