import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

const pool = new Pool({ connectionString: "postgres://postgres:admin@localhost:5432/rage" });

export const $db = drizzle(pool, { schema });
