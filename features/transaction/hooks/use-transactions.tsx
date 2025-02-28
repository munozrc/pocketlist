import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { db } from "@/database/init";
import { desc } from "drizzle-orm";
import { TransactionTable } from "@/database/schema";

export function useTransactions() {
  const { data } = useLiveQuery(
    db.query.TransactionTable.findMany({
      orderBy: desc(TransactionTable.createdAt),
    })
  );

  return { transactions: data ?? [] };
}
