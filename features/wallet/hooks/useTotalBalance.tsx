import { sql } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { useDatabase } from "@shared/contexts";

export function useTotalBalance() {
  const { db, schemas } = useDatabase();

  const { data } = useLiveQuery(
    db
      .select({ totalBalance: sql<number>`SUM(${schemas.wallets.balance})` })
      .from(schemas.wallets)
  );

  return data[0]?.totalBalance ?? 0;
}
