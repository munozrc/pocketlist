import { type TransactionType } from "@/database/schema";

export const transactionTypes: Record<TransactionType, string> = {
  expense: "Gasto",
  income: "Ingreso",
};
