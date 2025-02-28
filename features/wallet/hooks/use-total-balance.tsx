import { sql } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { db } from "@/database/init";
import { WalletTable } from "@/database/schema";

export function useTotalBalance() {
  const { data } = useLiveQuery(
    db
      .select({ totalBalance: sql<number>`SUM(${WalletTable.balance})` })
      .from(WalletTable)
  );

  return { totalBalance: data?.[0]?.totalBalance ?? 0 };
}
