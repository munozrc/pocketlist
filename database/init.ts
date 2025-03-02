import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

import * as schema from "./schema";

export const sqliteDb = openDatabaseSync("pocketlist.db", {
  enableChangeListener: true,
});

export const db = drizzle(sqliteDb, {
  casing: "snake_case",
  schema,
});

export async function initializeDatabase() {
  const count = await db.$count(schema.TransactionCategoryTable);

  if (count !== 0) {
    return;
  }

  await db.insert(schema.TransactionCategoryTable).values([
    {
      defaultIcon: "cash",
      name: "Sueldo",
      themeColor: "#A8D5BA",
      type: "income",
    },
    {
      defaultIcon: "laptop",
      name: "Freelance",
      themeColor: "#F9D5E5",
      type: "income",
    },
    {
      defaultIcon: "gift",
      name: "Regalos",
      themeColor: "#FFB7B2",
      type: "income",
    },
    {
      defaultIcon: "chart-line",
      name: "Inversiones",
      themeColor: "#C6D8AF",
      type: "income",
    },
    {
      defaultIcon: "shopping",
      name: "Ventas",
      themeColor: "#FFD3B6",
      type: "income",
    },
    {
      defaultIcon: "credit-card-refund",
      name: "Reembolso",
      themeColor: "#C9C6E3",
      type: "income",
    },
    {
      defaultIcon: "medal",
      name: "Bonos y comisiones",
      themeColor: "#B5EAD7",
      type: "income",
    },
    {
      defaultIcon: "currency-usd",
      name: "Otros ingresos",
      themeColor: "#FFDAC1",
      type: "income",
    },
    {
      defaultIcon: "home",
      name: "Alquiler",
      themeColor: "#FFABAB",
      type: "expense",
    },
    {
      defaultIcon: "lightbulb-on",
      name: "Servicios públicos",
      themeColor: "#FFC3A0",
      type: "expense",
    },
    {
      defaultIcon: "wifi",
      name: "Internet y teléfono",
      themeColor: "#E2F0CB",
      type: "expense",
    },
    {
      defaultIcon: "shield-check",
      name: "Seguros",
      themeColor: "#B5B9F8",
      type: "expense",
    },
    {
      defaultIcon: "school",
      name: "Educación",
      themeColor: "#D7BDE2",
      type: "expense",
    },
    {
      defaultIcon: "cart",
      name: "Supermercado",
      themeColor: "#FFC3A0",
      type: "expense",
    },
    {
      defaultIcon: "silverware",
      name: "Restaurantes y cafés",
      themeColor: "#FFB7B2",
      type: "expense",
    },
    {
      defaultIcon: "netflix",
      name: "Suscripciones",
      themeColor: "#C9C6E3",
      type: "expense",
    },
    {
      defaultIcon: "tshirt-crew",
      name: "Ropa y accesorios",
      themeColor: "#F8C8DC",
      type: "expense",
    },
    {
      defaultIcon: "airplane",
      name: "Viajes y vacaciones",
      themeColor: "#D4A5A5",
      type: "expense",
    },
    {
      defaultIcon: "heart-pulse",
      name: "Salud",
      themeColor: "#A2D5F2",
      type: "expense",
    },
    {
      defaultIcon: "bank",
      name: "Pago de deudas",
      themeColor: "#FFABAB",
      type: "expense",
    },
    {
      defaultIcon: "gift",
      name: "Regalos",
      themeColor: "#FFB7B2",
      type: "expense",
    },
    {
      defaultIcon: "paw",
      name: "Mascotas",
      themeColor: "#F8E2CF",
      type: "expense",
    },
    {
      defaultIcon: "cellphone",
      name: "Tecnología",
      themeColor: "#C5B9CD",
      type: "expense",
    },
    {
      defaultIcon: "car",
      name: "Transporte",
      themeColor: "#F3C1C6",
      type: "expense",
    },
  ]);
}
