import { GameEventType } from "./enums.ts";

export type Coordinates = {
  x: number;
  y: number;
};

export type SocketID = string;

export interface ServerOptions {
  port: number;
}

export interface GameEvent {
  type: GameEventType;
  gameID?: string;
  socketID?: SocketID;
  value?: number | string | Coordinates;
}

export type GameLobby = {
  gameID: string;
  players: string[];
  readyPlayers: Set<string>;
};

export type PokemonEgg = {
  id: string;
  pos: Coordinates;
  status: PokemonEggStatus;
};
