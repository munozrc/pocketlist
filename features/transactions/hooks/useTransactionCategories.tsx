import { and, eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { useDatabase } from "@shared/contexts";

import type { TransactionCategoryType } from "../types";

type Params = {
  type?: TransactionCategoryType;
};

export function useTransactionCategories({ type: categoryType }: Params) {
  const { db, schemas } = useDatabase();
  const conditions = [];

  if (
    typeof categoryType === "string" &&
    ["both", "income", "expense"].includes(categoryType)
  ) {
    conditions.push(eq(schemas.transactionCategories.type, categoryType));
  }

  const { data } = useLiveQuery(
    db.query.transactionCategories.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
    })
  );

  return {
    categories: data ?? [],
  };
}
