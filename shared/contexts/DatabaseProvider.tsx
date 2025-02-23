import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import {
  createContext,
  type PropsWithChildren,
  Suspense,
  useContext,
} from "react";
import { ActivityIndicator } from "react-native";

import migrations from "@drizzle/migrations";

const dbName = "pocketlist.db";
const expo = openDatabaseSync(dbName);
const db = drizzle(expo);

interface DbContextProps {
  db: typeof db;
}

const DatabaseContext = createContext<DbContextProps | undefined>(undefined);

export function DatabaseProvider({ children }: PropsWithChildren) {
  useMigrations(db, migrations);

  return (
    <DatabaseContext.Provider value={{ db }}>
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <SQLiteProvider databaseName={dbName} useSuspense>
          {children}
        </SQLiteProvider>
      </Suspense>
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);

  if (!context) {
    throw new Error("useDatabase must be used within a DbProvider");
  }

  return context;
}
