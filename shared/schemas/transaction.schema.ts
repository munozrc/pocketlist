import { sql } from "drizzle-orm";
import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";

import type {
  TransactionStatus,
  TransactionType,
} from "@features/transactions/types";
import type { Currency, PaymentMethod } from "@shared/types";

import { walletsTable } from "./wallet.schema";

export const transactionTable = sqliteTable("transactions", {
  id: integer().primaryKey({ autoIncrement: true }),
  walletId: integer()
    .notNull()
    .references(() => walletsTable.id),
  icon: text().notNull(),
  title: text().notNull(),
  amount: real().notNull(),
  type: text().notNull().$type<TransactionType>(),
  status: text().notNull().$type<TransactionStatus>(),
  paymentMethod: text().notNull().$type<PaymentMethod>(),
  currency: text().$type<Currency>().default("COP"),
  exchangeRate: integer(),
  category: text().notNull(),
  description: text(),
  isRecurring: integer({ mode: "boolean" }).default(false),
  receiptUrl: text(),
  createdAt: text().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
