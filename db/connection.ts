import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;

if (connectionString === undefined) {
  throw new Error("Database url is not defined");
}

const client = postgres(connectionString);
const db = drizzle(client);

export default db;
