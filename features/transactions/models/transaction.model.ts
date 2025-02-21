import type { Currency, PaymentMethod } from "@shared/types";

export interface Transaction {
  amount: number;
  category: string;
  currency: Currency;
  date: string; // ISO 8601 format
  description: string;
  exchangeRate: number;
  icon?: string;
  id: string;
  isRecurring: boolean;
  paymentMethod: PaymentMethod;
  status: "pending" | "completed" | "canceled";
  title: string;
  type: "income" | "expense";
  walletId: string;
}
