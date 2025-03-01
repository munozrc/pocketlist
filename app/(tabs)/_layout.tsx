import { Feather } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import { Button } from "@/components/ui/Button";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/lib/scaling";

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
          tabBarShowLabel: false,
          tabBarStyle: { paddingTop: 4 },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="wallets"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="repeat" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="shopping-list"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="shopping-bag" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <Button
        style={styles.button}
        onPress={() => router.push("/(modals)/create-transaction")}
      >
        <Feather name="plus" color={colors.white} size={30} />
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    borderRadius: verticalScale(30),
    width: verticalScale(48),
    height: verticalScale(48),
    aspectRatio: 1,
    bottom: 70,
    right: 25,
  },
});
