import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { db } from "@/database/init";
import { desc } from "drizzle-orm";
import { transactions } from "@/database/schema";

export function useTransactions() {
  const { data } = useLiveQuery(
    db.query.transactions.findMany({
      orderBy: desc(transactions.createdAt),
    })
  );

  return { transactions: data ?? [] };
}
