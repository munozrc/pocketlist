import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { formatCurrency } from "@/utils/number-utils";

export function TransactionCard() {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Feather name="video" size={16} />
        </View>
        <View>
          <Text style={styles.text}>Suscripción Netflix</Text>
          <Text style={styles.subtitle}>{new Date().toLocaleString()}</Text>
        </View>
      </View>
      <View>
        <Text style={[styles.text, styles.positiveAmount]}>
          {formatCurrency(26_000)}
        </Text>
        <Text style={styles.subtitle}>Entretenimiento</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#f0f0f0",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    paddingRight: 15,
  },
  header: {
    flexDirection: "row",
    gap: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: 600,
    color: "#101010",
  },
  positiveAmount: {
    color: "#4caf50",
  },
  negativeAmount: {
    color: "#f44336",
  },
  subtitle: {
    color: "#666",
    fontSize: 10,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: "100%",
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
});
