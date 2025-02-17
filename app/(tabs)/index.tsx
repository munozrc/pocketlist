import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ToggleGroup } from "@/components/ui";
import { AccountBalance, StatsCard } from "@/features/home/components";

const dateFilterOptions = {
  today: "Hoy",
  week: "Semana",
  month: "Mes",
  year: "Año",
} as const;

export default function HomeTab() {
  const [dateFilter, setDateFilter] =
    useState<keyof typeof dateFilterOptions>("month");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="#f5f5f5" />
      <View style={styles.header}>
        <AccountBalance amount={681_639.6} />
        <ToggleGroup
          options={dateFilterOptions}
          selectedKey={dateFilter}
          onChange={setDateFilter}
        />
        <StatsCard expenses={830_000} income={2_966_740} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 25,
    backgroundColor: "#f5f5f5",
    gap: 20,
  },
});
