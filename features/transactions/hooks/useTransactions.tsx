import { and, gte, lte, sql } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { useDatabase } from "@shared/contexts";

import type { TransactionFilters } from "../types";

export function useTransactions({
  page = 1,
  ...restOfFilters
}: TransactionFilters) {
  const { db, schemas } = useDatabase();
  const conditions = [];

  if (restOfFilters.startDate) {
    conditions.push(
      gte(schemas.transactions.createdAt, restOfFilters.startDate)
    );
  }

  if (restOfFilters.finalDate) {
    conditions.push(
      lte(schemas.transactions.createdAt, restOfFilters.finalDate)
    );
  }

  const { data: transactions } = useLiveQuery(
    db.query.transactions.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      orderBy: (transaction, { desc }) => desc(transaction.createdAt),
      offset: restOfFilters.size ? (page - 1) * restOfFilters.size : undefined,
      limit: restOfFilters.size,
    })
  );

  const { data: summary } = useLiveQuery(
    db
      .select({
        totalIncome: sql<number>`
        SUM(CASE WHEN ${schemas.transactions.type} = 'income' 
          THEN ${schemas.transactions.amount} ELSE 0 END)
      `,
        totalExpenses: sql<number>`
        SUM(CASE WHEN ${schemas.transactions.type} = 'expense' 
          THEN ${schemas.transactions.amount} ELSE 0 END)
      `,
      })
      .from(schemas.transactions)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
  );

  return {
    transactions: transactions ?? [],
    totalIncome: summary?.[0]?.totalIncome ?? 0,
    totalExpenses: summary?.[0]?.totalExpenses ?? 0,
  };
}
