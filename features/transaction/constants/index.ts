import { Feather } from "@expo/vector-icons";
import { ComponentProps } from "react";

import { type TransactionType } from "@/database/schema";

export const transactionTypes: Record<TransactionType, string> = {
  expense: "Gasto",
  income: "Ingreso",
};

export const transactionCategoryIcons: Record<
  number,
  NonNullable<ComponentProps<typeof Feather>["name"]>
> = {
  1: "dollar-sign",
  2: "briefcase",
  3: "shopping-cart",
  4: "truck",
};
