import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { useDatabase } from "@shared/contexts";

export function useWallets() {
  const { db } = useDatabase();
  const { data } = useLiveQuery(db.query.wallets.findMany());

  return { wallets: data ?? [] };
}
