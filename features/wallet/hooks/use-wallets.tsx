import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { db } from "@/database/init";

export function useWallets() {
  const { data } = useLiveQuery(db.query.WalletTable.findMany());
  return { wallets: data ?? [] };
}
