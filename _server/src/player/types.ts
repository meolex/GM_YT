import { playerApperanceTable } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type PlayerAppearance = InferSelectModel<typeof playerApperanceTable>;
