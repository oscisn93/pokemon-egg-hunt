import { v1 } from "https://deno.land/std@0.207.0/uuid/mod.ts";
import {
  hash,
  compare,
} from "https://deno.land/x/bcrypt@v0.4.0/mod.ts";

export interface User {
  userID?: string;
  username: string;
}

export interface Session {
  userID: string;
  expires: number;
}

const SESSION_LIFESPAN = 1000 * 60 * 60 * 24;

export class Database {
  private static instance: Database;
  private constructor () {}
  public static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  private async validSessionToken(kv: Deno.Kv, session: Session) {
    if (session.expires < Date.now()) {
      return session;
    }
    session.expires = Date.now() + SESSION_LIFESPAN;
    await kv.set(["sessions", session.userID], session);
    return session;
  }
  public async createUser(kv: Deno.Kv, user: User & { password: string }) {
    const passhash = await hash(user.password);
    user.userID = v1.generate() as string;
    kv.set(["passwords", user.userID!], passhash);

    const result = await kv.set(["users", user.userID], {
      userID: v1.generate(),
      username: user.username,
    });
    if (!result) {
      throw new Error("CONFILCT");
    }
    return this.validSessionToken(kv, {
      userID: user.userID!,
      expires: Date.now() + SESSION_LIFESPAN,
    });
  }
  public async authUser(kv: Deno.Kv, username: string, password: string) {
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
      const result = await kv.get<Session>(["sessions", user.userID!]);
      if (!result.value) {
        return this.validSessionToken(kv, {
          userID: user.userID!,
          expires: Date.now() + SESSION_LIFESPAN,
        });
      }
      return this.validSessionToken(kv, result.value!);
    } else {
      throw new Error("INVALID_CREDENTIALS");
    }
  }
  public async getUserByID(kv: Deno.Kv, userID: string) {
    return await kv.get<User>(["users", userID]);
  }
}
