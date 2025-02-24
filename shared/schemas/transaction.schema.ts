import { sql } from "drizzle-orm";
import { sqliteTable, text, real, integer, int } from "drizzle-orm/sqlite-core";

import type {
  TransactionStatus,
  TransactionType,
} from "@features/transactions/types";
import type { Currency, PaymentMethod } from "@shared/types";

import { wallets } from "./wallet.schema";

export const transactions = sqliteTable("transactions", {
  id: int().notNull().primaryKey({ autoIncrement: true }),
  walletId: int()
    .notNull()
    .references(() => wallets.id),
  icon: text(),
  title: text().notNull(),
  amount: real().notNull(),
  type: text().notNull().$type<TransactionType>(),
  status: text().$type<TransactionStatus>().default("completed"),
  paymentMethod: text().notNull().$type<PaymentMethod>(),
  currency: text().$type<Currency>().default("COP"),
  category: text().notNull(),
  description: text(),
  isRecurring: integer({ mode: "boolean" }).default(false),
  receiptUrl: text(),
  createdAt: integer({ mode: "timestamp" }).default(sql`(unixepoch())`),
  updatedAt: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(unixepoch())`),
});
