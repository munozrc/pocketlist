import { sql } from "drizzle-orm";
import { int, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date()),
};

export const WalletTable = sqliteTable("wallets", {
  id: int().notNull().primaryKey({ autoIncrement: true }),
  name: text().notNull().default(""),
  image: text(),
  defaultIcon: text("default_icon").default("layers-outline").notNull(),
  themeColor: text("theme_color").default("#007aff").notNull(),
  balance: real().default(0).notNull(),
  type: text().notNull().$type<WalletType>().default("cash"),
  currency: text().$type<Currency>().default("COP").notNull(),
  totalExpenses: real("total_expenses").default(0).notNull(),
  totalIncome: real("total_income").default(0).notNull(),
  ...timestamps,
});

export type TransactionType = "income" | "expense";

export const TransactionCategoryTable = sqliteTable("transaction_categories", {
  id: int().notNull().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  type: text().notNull().$type<TransactionType>(),
  defaultIcon: text("default_icon").notNull(),
  themeColor: text("theme_color").notNull(),
  ...timestamps,
});

export type TransactionStatus = "pending" | "completed" | "canceled";

export const TransactionTable = sqliteTable("transactions", {
  id: int().notNull().primaryKey({ autoIncrement: true }),
  walletId: int("wallet_id")
    .notNull()
    .references(() => WalletTable.id, { onDelete: "cascade" }),
  title: text().notNull().default(""),
  amount: real().notNull(),
  type: text().notNull().$type<TransactionType>().default("income"),
  status: text().$type<TransactionStatus>().default("completed").notNull(),
  currency: text().$type<Currency>().default("COP").notNull(),
  category: int().references(() => TransactionCategoryTable.id, {
    onDelete: "set null",
  }),
  description: text(),
  receiptUrl: text("receipt_url"),
  ...timestamps,
});
