import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

console.log("process.env.DATABASE_URL => ", import.meta.env.DATABASE_URL);

const pool = new Pool({
  connectionString: import.meta.env.DATABASE_URL!,
});

export const db = drizzle({
  schema,
  client: pool,
});
