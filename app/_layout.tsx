import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { DatabaseProvider } from "@shared/contexts";

export default function RootLayout() {
  return (
    <DatabaseProvider>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen
            name="(modals)/create-wallet"
            options={{ headerShown: false, presentation: "modal" }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </DatabaseProvider>
  );
}
