import { sql } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { db } from "@/database/init";
import { wallets } from "@/database/schema";

export function useTotalBalance() {
  const queryObject = { totalBalance: sql<number>`SUM(${wallets.balance})` };
  const { data } = useLiveQuery(db.select(queryObject).from(wallets));
  return { totalBalance: data?.[0]?.totalBalance ?? 0 };
}
