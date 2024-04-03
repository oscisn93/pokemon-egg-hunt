export type MessageType = "set-client-id" | "create-player" | "move-player";

export type SocketMessage = {
    type: MessageType;
    socketID?: string;
    playerName?: string;
    position?: { x: number; y: number };
};

export interface ServerOptions {
  port: number;
}
