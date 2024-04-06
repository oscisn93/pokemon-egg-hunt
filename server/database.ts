import { hash, compare, genSalt } from "https://deno.land/x/bcrypt@v0.4.0/mod.ts";

export interface User {
    userID?: string;
    username: string;
}

const SESSION_LIFESPAN = 1000 * 60 * 60 * 24;

export class Database {
    private kv: KVNamespace;
    constructor() {
        this.kv = Await Deno.openKV();
    }
    async createUser(user: User & { password: string }) {
        const passhash = await hash(user.password);
        user.userID = v1.generate();
        kv.set(["passwords", user.userID], passhash);

        const result = await this.kv.set(["users", user.userID], {
            userID: v1.generate(),
            username: user.username,
        });
        if (!result.value) {
            throw new Error("CONFILCT");
        }
        return this.validSessionToken(result.value);
    }
    async authUser(username: string, password: string) {
        const user = await this.kv.get(["users", username]);
        if (!user) {
            return false;
        }
        const passhash = await this.kv.get(["passwords", user.userID]);
        if (compare(password, passhash)) {
            const result = await this.kv.get<Session>(["sessions", user.userID]);
            return this.validSessionToken(result.value);
        } else {
            throw new Error("INVALID_CREDENTIALS");
        }
    }
    async getUserByID(userID: string) {
        return await this.kv.get<User>(["users", userID]);
    }
    
}