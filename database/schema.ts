import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real, int } from "drizzle-orm/sqlite-core";

export type WalletType =
  | "bank"
  | "cash"
  | "credit_card"
  | "crypto"
  | "debit_card"
  | "digital_wallet"
  | "other";

export type Currency =
  | "USD"
  | "COP"
  | "EUR"
  | "GBP"
  | "JPY"
  | "AUD"
  | "CAD"
  | "CHF"
  | "CNY"
  | "INR";

const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date()),
};

export const wallets = sqliteTable("wallets", {
  id: int().notNull().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  balance: real().notNull().default(0),
  type: text().notNull().$type<WalletType>(),
  currency: text().$type<Currency>().default("COP"),
  totalExpenses: real("total_expenses").notNull().default(0),
  totalIncome: real("total_income").notNull().default(0),
  ...timestamps,
});

export type TransactionType = "income" | "expense";

export const transactionCategories = sqliteTable("transaction_categories", {
  id: int().notNull().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  type: text().notNull().$type<TransactionType>(),
  ...timestamps,
});

export type TransactionStatus = "pending" | "completed" | "canceled";

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
  currency: text().$type<Currency>().default("COP"),
  category: int()
    .notNull()
    .references(() => transactionCategories.id),
  description: text(),
  isRecurring: integer("is_recurring", { mode: "boolean" }).default(false),
  receiptUrl: text("receipt_url"),
  ...timestamps,
});
