import { and, gte, lte, SQL, sql } from "drizzle-orm";
import { useEffect, useState } from "react";

import { db } from "@/database/init";
import { TransactionTable } from "@/database/schema";

type TransactionSummaryFilters = {
  startDate?: Date;
  finalDate?: Date;
};

const INITIAL_TRANSACTION_SUMMARY = {
  totalIncome: 0,
  totalExpenses: 0,
};

async function getTransactionSummary(filters: TransactionSummaryFilters) {
  const filtersQuery: SQL[] = [];

  if (filters.startDate) {
    filtersQuery.push(gte(TransactionTable.createdAt, filters.startDate));
  }

  if (filters.finalDate) {
    filtersQuery.push(lte(TransactionTable.createdAt, filters.finalDate));
  }

  try {
    const [{ totalExpenses, totalIncome }] = await db
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
      .where(filtersQuery.length ? and(...filtersQuery) : undefined);

    return {
      totalExpenses: totalExpenses ?? 0,
      totalIncome: totalIncome ?? 0,
    };
  } catch {
    return INITIAL_TRANSACTION_SUMMARY;
  }
}

export function useTransactionSummary(filters: TransactionSummaryFilters) {
  const [summary, setSummary] = useState<
    Awaited<ReturnType<typeof getTransactionSummary>>
  >(INITIAL_TRANSACTION_SUMMARY);

  useEffect(() => {
    void getTransactionSummary({
      startDate: filters.startDate,
      finalDate: filters.finalDate,
    }).then(setSummary);
  }, [filters.startDate, filters.finalDate]);

  return {
    totalIncome: summary.totalIncome,
    totalExpenses: summary.totalExpenses,
  };
}
