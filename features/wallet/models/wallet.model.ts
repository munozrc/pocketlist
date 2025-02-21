import type { Currency } from "@shared/types";

export interface Wallet {
  balance: number;
  currency: Currency;
  icon?: string;
  id: string;
  name: string;
  type: "bank" | "cash" | "credit_card" | "crypto" | "other";
}
