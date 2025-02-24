import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import {
  createContext,
  type PropsWithChildren,
  Suspense,
  useContext,
  useMemo,
} from "react";
import { ActivityIndicator, View } from "react-native";

import migrations from "@drizzle/migrations";
import * as transactionCategoriesSchema from "@shared/schemas/transaction-categories";
import * as transactionsSchema from "@shared/schemas/transactions";
import * as walletsSchema from "@shared/schemas/wallets";

const SCHEMAS = {
  ...transactionCategoriesSchema,
  ...transactionsSchema,
  ...walletsSchema,
};

const DATABASE_NAME = "pocketlist";

interface DbContextProps {
  db: ReturnType<typeof drizzle<typeof SCHEMAS>>;
  schemas: typeof SCHEMAS;
}

const DatabaseContext = createContext<DbContextProps | undefined>(undefined);

function DatabaseInitializer({ children }: PropsWithChildren) {
  const sqliteDb = useSQLiteContext();

  const db = useMemo(
    () => drizzle(sqliteDb, { schema: SCHEMAS, casing: "snake_case" }),
    [sqliteDb]
  );

  useMigrations(db, migrations);
  useDrizzleStudio(sqliteDb);

  return (
    <DatabaseContext.Provider value={{ db, schemas: SCHEMAS }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function DatabaseProvider({ children }: PropsWithChildren) {
  return (
    <Suspense
      fallback={
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      }
    >
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <DatabaseInitializer>{children}</DatabaseInitializer>
      </SQLiteProvider>
    </Suspense>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);

  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }

  return context;
}
