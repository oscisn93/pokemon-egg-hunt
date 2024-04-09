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

export async function loginUser(username: string, password: string) {
  const kv = await Deno.openKv();
  const userResult = await kv.get<User>(["users_by_username", username]);
  if (!userResult.value) {
    throw new Error("USER_NOT_FOUND");
  }
  const user = userResult.value;
  if (await compare(password, user.password!)) {
    let session: Session | undefined;
    const result = await kv.get<Session>(["sessions_by_id", user.id!]);
    if (!result.value) {
      const token = accessToken.generate("uat", SECRET);
      session = {
        userID: user.id!,
        token,
      };
      kv.set(["sessions", user.id!], session, {
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

export async function createUser(username: string, password: string) {
  // hash password before inserting into the db
  const passhash = await hash(password);
  // create our user object with a unique id
  const user: User = {
    id: v1.generate().toString().split(",").join(""),
    username,
    password: passhash,
  };

  const primaryKey = ["users", user.id];
  const byUsernameKey = ["users_by_username", user.username];

  const kv = await Deno.openKv();
  const result = await kv
    .atomic()
    .check({ key: primaryKey, versionstamp: null })
    .check({ key: byUsernameKey, versionstamp: null })
    .set(primaryKey, user)
    .set(byUsernameKey, user)
    .commit();

  if (!result.ok) {
    throw new Error("INTERNAL_CONFILCT");
  }

  const token = accessToken.generate("uat", SECRET);
  const session: Session = {
    userID: user.id,
    token,
  };

  const resultSession = await kv
    .atomic()
    .check({ key: ["sessions", session.token], versionstamp: null })
    .check({ key: ["sessions_by_id", session.userID], versionstamp: null })
    .set(["sessions", token], session, { expireIn: SESSION_LIFESPAN })
    .set(["sessions_by_userID", user.id], session, {
      expireIn: SESSION_LIFESPAN,
    })
    .commit();

  if (!resultSession.ok) {
    throw new Error("INTERNAL_CONFLICT");
  }
  return session;
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
export async function getUserByUsername(username: string) {
  const kv = await Deno.openKv();
  const result = await kv.get<User>(["users", username]);
  if (!result.value) {
    console.error("USER_NOT_FOUND");
  }
  return result;
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

export async function getPlayerIDBySessionToken(sessionToken: string) {
  const kv = await Deno.openKv();
  const result = await kv.get<Session>(["sessions", sessionToken]);
  if (!result.value) {
    // Unauthorized
    throw new Error("INVALID_SESSION_TOKEN");
  }
  return result.value.userID;
}
