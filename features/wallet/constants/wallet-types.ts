import { type WalletType } from "@/database/schema";

export const walletTypes: Record<WalletType, string> = {
  cash: "Efectivo",
  digital_wallet: "Billetera digital",
  bank: "Cuenta bancaria",
  credit_card: "Tarjeta de crédito",
  debit_card: "Tarjeta de débito",
  crypto: "Criptomoneda",
  other: "Otro",
};
