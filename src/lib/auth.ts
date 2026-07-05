import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/index";
import * as schema from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  baseURL: "http://localhost:4321",
  trustedOrigins: ["http://localhost:4321"],
  emailAndPassword: {
    enabled: true,
  },
});
