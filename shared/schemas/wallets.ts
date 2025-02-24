import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real, int } from "drizzle-orm/sqlite-core";

import type { WalletType } from "@features/wallet/types/wallet";
import type { Currency } from "@shared/types";

export const wallets = sqliteTable("wallets", {
  id: int().notNull().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  balance: real().notNull(),
  type: text().notNull().$type<WalletType>(),
  currency: text().$type<Currency>().default("COP"),
  icon: text(),
  totalExpenses: real("total_expenses").default(0),
  totalIncome: real("total_income").default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(unixepoch())`),
});
