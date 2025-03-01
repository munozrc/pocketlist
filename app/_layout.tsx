import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { db, sqliteDb } from "@/database/init";
import migrations from "@/database/migrations/migrations";

export default function RootLayout() {
  useMigrations(db, migrations);
  useDrizzleStudio(sqliteDb);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(modals)/create-transaction"
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="(modals)/create-wallet"
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
