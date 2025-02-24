import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, int } from "drizzle-orm/sqlite-core";

import type { TransactionCategoryType } from "@features/transactions/types";

export const transactionCategories = sqliteTable("transaction_categories", {
  id: int().notNull().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  type: text().notNull().$type<TransactionCategoryType>(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(unixepoch())`),
});
