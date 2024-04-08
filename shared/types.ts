// GameEventType describes the type of game event our the
// GameEventSource will be listening for
export type GameEventType = "join" | "ready" | "leave";
// GameEventData is the format for our GameEventSource's data
export type GameEventData = {
  gameID: string;
  playerID: string;
};
// GameEvent implements of the MessageEvent interface
export type GameEvent = MessageEvent<GameEventData>;
// this type-guard function checks if the given object is a GameEventData
export function isGameEventData(o: unknown): o is GameEventData {
  return (
    (o as GameEventData)?.gameID !== undefined &&
    typeof (o as GameEventData).gameID === "string" &&
    (o as GameEventData)?.playerID !== undefined &&
    typeof (o as GameEventData).playerID === "string"
  );
}
// this type-guard function checks if the given object is a GameEvent
export function isGameEvent(o: unknown): o is GameEvent {
  return (
    (o as GameEvent)?.type !== undefined &&
    typeof (o as GameEvent).type === "string" &&
    (o as GameEvent)?.data !== undefined &&
    typeof (o as GameEvent).data === "object" &&
    isGameEventData((o as GameEvent).data)
  );
}
// InputEventType describes the type of input event our
// EventSource will be listening for
export type InputEventType =
  | "left"
  | "right"
  | "up"
  | "down"
  | "leftRelease"
  | "rightRelease"
  | "upRelease"
  | "downRelease"
  | "leftDown"
  | "rightDown"
  | "upDown"
  | "downDown";
export type KeyType = "left" | "right" | "up" | "down";
// InputEventMessage is the message format for our InputEventSource's data
export type InputEventData = {
  key: KeyType;
  playerID: string;
};
// InputEvent implements of the MessageEvent interface
export type InputMessageEvent = MessageEvent<InputEventData>;
// this type-guard function checks if the given object is a InputEventData
export function isInputEventData(o: unknown): o is InputEventData {
  return (
    (o as InputEventData)?.key !== undefined &&
    typeof (o as InputEventData).key === "string" &&
    (o as InputEventData)?.playerID !== undefined &&
    typeof (o as InputEventData).playerID === "string"
  );
}
// this type-guard function checks if the given object is a InputEvent
export function isInputMessageEvent(o: unknown): o is InputMessageEvent {
  return (
    (o as InputMessageEvent)?.type !== undefined &&
    typeof (o as InputMessageEvent).type === "string" &&
    (o as InputMessageEvent)?.data !== undefined &&
    typeof (o as InputMessageEvent).data === "object" &&
    isInputEventData((o as InputMessageEvent).data)
  );
}
export type User = {
  userID: string;
  username: string;
}

export type Session = {
  userID: string;
  token: string;
}

export type GameStatus = {
  gameID: string;
  active: boolean;
  ready: number;
  total: number;
};

// export type EggStatus = "idle" | "hidden" | "collected" | "hatched";
// export type PokemonEgg = {
//   id: string;
//   pos: { x: number; y: number };
//   status: EggStatus;
// };
