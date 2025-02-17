import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ToggleGroup } from "@/components/ui";
import { AccountBalance, StatsCard } from "@/features/home/components";
import { TransactionCard } from "@/features/home/components/TransactionCard";

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
      <View style={styles.transactionsContainer}>
        <Text style={styles.transactionTitle}>Transacciones Recientes</Text>
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={TransactionCard}
        />
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
  transactionsContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 25,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 15,
    color: "#101010",
  },
});
