import { WalletType } from "../types/wallet";

export const walletTypes: Record<WalletType, string> = {
  bank: "Cuenta bancaria",
  cash: "Efectivo",
  credit_card: "Tarjeta de crédito",
  crypto: "Criptomoneda",
  debit_card: "Tarjeta de débito",
  digital_wallet: "Billetera digital",
  other: "Otro",
};
