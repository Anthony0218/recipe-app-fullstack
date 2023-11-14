import { migrate } from "drizzle-orm/postgres-js/migrator";
import db from "./connection";


const migrateDB = async () => {
  console.log("migration started");
  migrate(db, { migrationsFolder: "migrations" });
  console.log("migration ended");
};

migrateDB();
