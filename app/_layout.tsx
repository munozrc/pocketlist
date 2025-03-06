import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { db, initializeDatabase, sqliteDb } from "@/database/init";
import migrations from "@/database/migrations/migrations";

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(sqliteDb);

  useEffect(() => {
    if (!success || error) return;
    void initializeDatabase();
  }, [success, error]);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(modals)/create-transaction"
          options={{ presentation: "transparentModal" }}
        />
        <Stack.Screen
          name="(modals)/create-wallet"
          options={{ presentation: "transparentModal" }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
