import { StyleSheet, Text, View } from "react-native";

import { formatCurrency } from "@/utils/numberUtil";

type AccountBalanceProps = {
  amount?: number;
};

export function AccountBalance({ amount }: AccountBalanceProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Saldo Disponible</Text>
      <Text style={styles.amount}>{formatCurrency(amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: 400,
    color: "#9d9ea2",
  },
  amount: {
    fontSize: 28,
    fontWeight: 600,
    color: "#101010",
  },
});
