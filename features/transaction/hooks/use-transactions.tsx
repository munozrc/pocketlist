import {
  and,
  desc,
  eq,
  getTableColumns,
  gte,
  lte,
  type SQL,
} from "drizzle-orm";
import { useEffect, useState } from "react";

import { db } from "@/database/init";
import { TransactionCategoryTable, TransactionTable } from "@/database/schema";

type GetAllTransactionFilters = {
  startDate?: Date;
  finalDate?: Date;
};

async function getAllTransactions(filters: GetAllTransactionFilters) {
  const filtersQuery: SQL[] = [];

  if (filters.startDate) {
    filtersQuery.push(gte(TransactionTable.createdAt, filters.startDate));
  }

  if (filters.finalDate) {
    filtersQuery.push(lte(TransactionTable.createdAt, filters.finalDate));
  }

  try {
    return await db
      .select({
        ...getTableColumns(TransactionTable),
        category: TransactionCategoryTable.id,
        categoryName: TransactionCategoryTable.name,
        categoryIcon: TransactionCategoryTable.defaultIcon,
        categoryColor: TransactionCategoryTable.themeColor,
      })
      .from(TransactionTable)
      .innerJoin(
        TransactionCategoryTable,
        eq(TransactionTable.category, TransactionCategoryTable.id)
      )
      .where(filtersQuery.length ? and(...filtersQuery) : undefined)
      .orderBy(desc(TransactionTable.createdAt));
  } catch {
    return [];
  }
}

export function useTransactions(filters: GetAllTransactionFilters) {
  const [transactions, setTransactions] = useState<
    Awaited<ReturnType<typeof getAllTransactions>>
  >([]);

  useEffect(() => {
    void getAllTransactions({
      startDate: filters.startDate,
      finalDate: filters.finalDate,
    }).then(setTransactions);
  }, [filters.startDate, filters.finalDate]);

  return {
    transactions: transactions ?? [],
  };
}
