import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { formatCurrency } from "@/utils/numberUtil";

type StatsCardProps = {
  income?: number;
  expenses?: number;
};

export function StatsCard({ income, expenses }: StatsCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.badge, { backgroundColor: "#9ade7b" }]}>
          <Feather name="arrow-up" color="#101010" size={16} />
        </View>
        <View>
          <Text style={styles.label}>Ingresos</Text>
          <Text style={styles.amount}>{formatCurrency(income)}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.badge, { backgroundColor: "#f38585" }]}>
          <Feather name="arrow-down" color="#101010" size={16} />
        </View>
        <View>
          <Text style={styles.label}>Gastos</Text>
          <Text style={styles.amount}>{formatCurrency(expenses)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  badge: {
    width: 36,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  label: {
    fontSize: 12,
    fontWeight: 400,
    color: "#9d9ea2",
  },
  amount: {
    fontSize: 14,
    fontWeight: 600,
    color: "#101010",
  },
});
