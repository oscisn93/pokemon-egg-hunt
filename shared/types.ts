import { KeyBoardEventType, PokemonEggStatus } from "./enums.ts";

export type Coordinates = {
  x: number;
  y: number;
};

export type SocketID = string;

export interface ServerOptions {
  port: number;
}

export type GameEvent = {
  gameID?: string;
  playerID?: string;
  value?: number | string | Coordinates;
};

export type KeyBoardEventData = {
  key: KeyBoardEventType;
  playerID: string;
};

export interface KeyBoardEventMessage {
  type: KeyBoardEventType;
  data: KeyBoardEventData;
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
