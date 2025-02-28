import { and, eq, type SQL } from "drizzle-orm";
import { useEffect, useState } from "react";

import { db } from "@/database/init";
import { transactionCategories, type TransactionType } from "@/database/schema";

export type GetAllCategoriesFilters = {
  type?: TransactionType;
};

export async function getAllCategories({
  type: categoryType,
}: GetAllCategoriesFilters) {
  const conditions: SQL[] = [];

  if (
    typeof categoryType === "string" &&
    (categoryType === "expense" || categoryType === "income")
  ) {
    conditions.push(eq(transactionCategories.type, categoryType));
  }

  return db
    .select()
    .from(transactionCategories)
    .where(conditions.length > 0 ? and(...conditions) : undefined);
}

export function useTransactionCategories({ type }: GetAllCategoriesFilters) {
  const [categories, setCategories] = useState<
    Awaited<ReturnType<typeof getAllCategories>>
  >([]);

  useEffect(() => {
    void getAllCategories({ type })
      .then(setCategories)
      .catch(() => setCategories([]));
  }, [type]);

  return {
    categories,
  };
}
