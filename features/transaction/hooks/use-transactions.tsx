import { desc, eq, getTableColumns } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { db } from "@/database/init";
import { TransactionCategoryTable, TransactionTable } from "@/database/schema";

export function useTransactions() {
  const { data } = useLiveQuery(
    db
      .select({
        ...getTableColumns(TransactionTable),
        category: TransactionCategoryTable.id,
        categoryName: TransactionCategoryTable.name,
      })
      .from(TransactionTable)
      .innerJoin(
        TransactionCategoryTable,
        eq(TransactionTable.category, TransactionCategoryTable.id)
      )
      .orderBy(desc(TransactionTable.createdAt))
  );

  return { transactions: data ?? [] };
}
