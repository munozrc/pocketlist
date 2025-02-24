import { sql } from "drizzle-orm";
import { sqliteTable, text, real, integer, int } from "drizzle-orm/sqlite-core";

import type {
  TransactionStatus,
  TransactionType,
} from "@features/transactions/types";
import type { Currency, PaymentMethod } from "@shared/types";

import { transactionCategories } from "./transaction-categories";
import { wallets } from "./wallets";

export const transactions = sqliteTable("transactions", {
  id: int().notNull().primaryKey({ autoIncrement: true }),
  walletId: int("wallet_id")
    .notNull()
    .references(() => wallets.id),
  icon: text(),
  title: text().notNull(),
  amount: real().notNull(),
  type: text().notNull().$type<TransactionType>(),
  status: text().$type<TransactionStatus>().default("completed"),
  paymentMethod: text("payment_method").notNull().$type<PaymentMethod>(),
  currency: text().$type<Currency>().default("COP"),
  category: int()
    .notNull()
    .references(() => transactionCategories.id),
  description: text(),
  isRecurring: integer("is_recurring", { mode: "boolean" }).default(false),
  receiptUrl: text("receipt_url"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(unixepoch())`),
});
