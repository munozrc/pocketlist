import { and, gte, lte, sql, SQL } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { db } from "@/database/init";
import { TransactionTable } from "@/database/schema";

type TransactionSummaryFilters = {
  startDate?: Date;
  finalDate?: Date;
};

function getTransactionSummary(filters: TransactionSummaryFilters) {
  const whereCondition: SQL[] = [];

  if (filters.startDate) {
    whereCondition.push(gte(TransactionTable.createdAt, filters.startDate));
  }

  if (filters.finalDate) {
    whereCondition.push(lte(TransactionTable.createdAt, filters.finalDate));
  }

  return db
    .select({
      totalIncome: sql<number>`SUM(
        CASE WHEN ${TransactionTable.type} = 'income' 
        THEN ${TransactionTable.amount} 
        ELSE 0 END
      )`,
      totalExpenses: sql<number>`SUM(
        CASE WHEN ${TransactionTable.type} = 'expense' 
        THEN ${TransactionTable.amount} 
        ELSE 0 END
      )`,
    })
    .from(TransactionTable)
    .where(whereCondition.length > 0 ? and(...whereCondition) : undefined);
}

export function useTransactionSummary(filters: TransactionSummaryFilters) {
  const { data: summary } = useLiveQuery(getTransactionSummary(filters));
  return summary[0] ?? { totalIncome: 0, totalExpenses: 0 };
}
