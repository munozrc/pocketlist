import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

import type { WalletType } from "@features/wallet/types/wallet";
import type { Currency } from "@shared/types";

export const walletsTable = sqliteTable("wallets", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  balance: real().notNull(),
  type: text().notNull().$type<WalletType>(),
  currency: text().$type<Currency>().default("COP"),
  icon: text().notNull(),
  totalExpenses: real().notNull(),
  totalIncome: real().notNull(),
  createdAt: text().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
