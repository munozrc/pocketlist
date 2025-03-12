import { type ImageSourcePropType, type ViewStyle } from "react-native";

import { type WalletType } from "@/database/schema";

type FinancialEntity = {
  id: number;
  name: string;
  brandColor: NonNullable<ViewStyle["backgroundColor"]>;
  brandIcon: ImageSourcePropType;
  supportedWalletTypes: WalletType[];
  countryCode: "CO";
  isEnabled: boolean;
};

export const financialEntities: FinancialEntity[] = [
  {
    id: 1,
    name: "Efectivo",
    brandColor: "#76cc5b",
    brandIcon: require("@/assets/images/financial-entities/cash.jpg"),
    supportedWalletTypes: ["cash"],
    countryCode: "CO",
    isEnabled: true,
  },
  {
    id: 2,
    name: "Bancolombia",
    brandColor: "#f6cb04",
    brandIcon: require("@/assets/images/financial-entities/bancolombia.jpg"),
    supportedWalletTypes: ["bank", "credit_card", "debit_card"],
    countryCode: "CO",
    isEnabled: true,
  },
  {
    id: 3,
    name: "Davivienda",
    brandColor: "#e61c27",
    brandIcon: require("@/assets/images/financial-entities/davivienda.jpg"),
    supportedWalletTypes: ["bank", "credit_card", "debit_card"],
    countryCode: "CO",
    isEnabled: true,
  },
  {
    id: 4,
    name: "Nequi",
    brandColor: "#02cad9",
    brandIcon: require("@/assets/images/financial-entities/nequi.webp"),
    supportedWalletTypes: ["digital_wallet"],
    countryCode: "CO",
    isEnabled: true,
  },
  {
    id: 5,
    name: "Ahorro a la mano",
    brandColor: "#fdda24",
    brandIcon: require("@/assets/images/financial-entities/ahorro-a-la-mano.jpg"),
    supportedWalletTypes: ["digital_wallet"],
    countryCode: "CO",
    isEnabled: true,
  },
  {
    id: 6,
    name: "Daviplata",
    brandColor: "#ec202b",
    brandIcon: require("@/assets/images/financial-entities/daviplata.jpg"),
    supportedWalletTypes: ["digital_wallet"],
    countryCode: "CO",
    isEnabled: true,
  },
  {
    id: 7,
    name: "Banco de Bogotá",
    brandColor: "#004a99",
    brandIcon: require("@/assets/images/financial-entities/banco-de-bogota.jpg"),
    supportedWalletTypes: ["bank", "credit_card", "debit_card"],
    countryCode: "CO",
    isEnabled: true,
  },
  {
    id: 8,
    name: "Banco Popular",
    brandColor: "#007b3e",
    brandIcon: require("@/assets/images/financial-entities/banco-popular.jpg"),
    supportedWalletTypes: ["bank", "credit_card", "debit_card"],
    countryCode: "CO",
    isEnabled: true,
  },
  {
    id: 9,
    name: "BBVA",
    brandColor: "#0033a0",
    brandIcon: require("@/assets/images/financial-entities/bbva.jpg"),
    supportedWalletTypes: ["bank", "credit_card", "debit_card"],
    countryCode: "CO",
    isEnabled: true,
  },
  {
    id: 10,
    name: "AV Villas",
    brandColor: "#c8102e",
    brandIcon: require("@/assets/images/financial-entities/av-villas.webp"),
    supportedWalletTypes: ["bank", "credit_card", "debit_card"],
    countryCode: "CO",
    isEnabled: true,
  },
  {
    id: 11,
    name: "Movii",
    brandColor: "#ff0084",
    brandIcon: require("@/assets/images/financial-entities/movii.jpg"),
    supportedWalletTypes: ["digital_wallet"],
    countryCode: "CO",
    isEnabled: true,
  },
  {
    id: 12,
    name: "Nu",
    brandColor: "#8a05be",
    brandIcon: require("@/assets/images/financial-entities/nu.webp"),
    supportedWalletTypes: ["credit_card"],
    countryCode: "CO",
    isEnabled: true,
  },
  {
    id: 13,
    name: "PayPal",
    brandColor: "#003087",
    brandIcon: require("@/assets/images/financial-entities/paypal.webp"),
    supportedWalletTypes: ["digital_wallet"],
    countryCode: "CO",
    isEnabled: true,
  },
  {
    id: 14,
    name: "Mercado Pago",
    brandColor: "#009ee3",
    brandIcon: require("@/assets/images/financial-entities/mercado-pago.jpg"),
    supportedWalletTypes: ["digital_wallet"],
    countryCode: "CO",
    isEnabled: true,
  },
  {
    id: 15,
    name: "Exodus",
    brandColor: "#1f1f1f",
    brandIcon: require("@/assets/images/financial-entities/exodus.jpg"),
    supportedWalletTypes: ["crypto"],
    countryCode: "CO",
    isEnabled: true,
  },
  {
    id: 16,
    name: "MetaMask",
    brandColor: "#f6851b",
    brandIcon: require("@/assets/images/financial-entities/meta-mask.jpg"),
    supportedWalletTypes: ["crypto"],
    countryCode: "CO",
    isEnabled: true,
  },
  {
    id: 17,
    name: "Trust Wallet",
    brandColor: "#3375bb",
    brandIcon: require("@/assets/images/financial-entities/trust.jpg"),
    supportedWalletTypes: ["crypto"],
    countryCode: "CO",
    isEnabled: true,
  },
];
