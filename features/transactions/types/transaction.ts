export type TransactionStatus = "pending" | "completed" | "canceled";
export type TransactionType = "income" | "expense";

export type TransactionFilters = {
  startDate?: Date;
  finalDate?: Date;
  status?: TransactionStatus;
  type?: TransactionType;
  page?: number;
  size?: number;
};
