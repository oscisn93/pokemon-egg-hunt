import { v1 } from "https://deno.land/std@0.207.0/uuid/mod.ts";
import { hash, compare } from "https://deno.land/x/bcrypt@v0.4.0/mod.ts";
import {
  GameEvent,
  GameStatus,
  InputMessageEvent,
  Session,
  User,
} from "../shared/types.ts";
import { accessToken } from "https://deno.land/x/access_token@1.0.0/mod.ts";

const SESSION_LIFESPAN = 1000 * 60 * 60 * 24;
export const SECRET = "SHHHH...IT's-A_SECRET";

export async function createUser(user: User & { password: string }) {
  const passhash = await hash(user.password);
  user.userID = v1.generate() as string;
  const kv = await Deno.openKv();
  kv.set(["passwords", user.userID!], passhash);
  const result = await kv.set(["users", user.userID], {
    userID: v1.generate(),
    username: user.username,
  });
  if (!result) {
    throw new Error("CONFILCT");
  }
  const token = accessToken.generate("uat", SECRET);
  const session: Session = {
    userID: user.userID,
    token,
  };
  kv.set(["sessions", token], session, { expireIn: SESSION_LIFESPAN });
  return session;
}
export async function authUser(username: string, password: string) {
  const kv = await Deno.openKv();
  const user_result = await kv.get<User>(["users", username]);
  if (!user_result.value) {
    throw new Error("INVALID_USERNAME");
  }
  const user = user_result.value;
  const pass_result = await kv.get<string>(["passwords", user.userID!]);
  if (!pass_result.value) {
    throw new Error("SERVER_ERROR");
  }
  const passhash = pass_result.value;
  if (await compare(password, passhash)) {
    let session: Session | undefined;
    const result = await kv.get<Session>(["sessions", user.userID!]);
    if (!result.value) {
      const token = accessToken.generate("uat", SECRET);
      session = {
        userID: user.userID!,
        token,
      };
      kv.set(["sessions", user.userID!], session, {
        expireIn: SESSION_LIFESPAN,
      });
    } else {
      session = result.value;
    }
    return session;
  } else {
    throw new Error("INVALID_PASSWORD");
  }
}

export async function enqueGameEvent(gameEvent: GameEvent) {
  const kv = await Deno.openKv();
  await kv.enqueue(gameEvent);
}

export async function enqueInputEvent(input: InputMessageEvent) {
  const kv = await Deno.openKv();

  await kv.enqueue(input);
}

export async function getUserByID(userID: string) {
  const kv = await Deno.openKv();
  return await kv.get<User>(["users", userID]);
}

export async function createGame(gameID: string, players: number) {
  const kv = await Deno.openKv();
  const gameStatus: GameStatus = {
    gameID,
    active: true,
    ready: 0,
    total: players,
  };
  const result = await kv.set(["games", gameID], gameStatus);
  if (!result) {
    throw new Error("CONFLICT");
  }
  return gameStatus;
}

export async function startGame(gameID: string) {
  const kv = await Deno.openKv();
  const game = await kv.get<GameStatus>(["games", gameID]);
  if (!game.value) {
    throw new Error("GAME_NOT_FOUND");
  }
  game.value.active = true;
  await kv.set(["games", gameID], game.value);
}

export async function endGame(gameID: string) {
  const kv = await Deno.openKv();
  return await kv.set(["games", gameID], { gameID, active: false });
}

export async function updateGameReadyCount(gameID: string) {
  const kv = await Deno.openKv();
  const game = await kv.get<GameStatus>(["games", gameID]);
  if (!game.value) {
    throw new Error("GAME_NOT_FOUND");
  }
  game.value.ready++;
  if (game.value.ready === game.value.total) {
    game.value.active = false;
  }
  await kv.set(["games", gameID], game.value);
}

export async function getGameStatusByID(gameID: string) {
  const kv = await Deno.openKv();
  const result = await kv.get<GameStatus>(["games", gameID]);
  if (!result.value) {
    throw new Error("GAME_NOT_FOUND");
  }
  return result.value;
}

export async function getPlayerIDBySessionToken(sessionToken: string){
  const kv = await Deno.openKv();
  const result = await kv.get<Session>(["sessions", sessionToken]);
  if (!result.value) {
    // Unauthorized
    throw new Error("INVALID_SESSION_TOKEN");
  }
  return result.value.userID;
}