import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const formatCurrency = new Intl.NumberFormat("es-CO", {
  currency: "COP",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  style: "currency",
});

export default function HomeTab() {
  return (
    <View style={[styles.container, { paddingTop: Constants.statusBarHeight }]}>
      <View style={styles.header}>
        <View style={styles.totalBalanceContainer}>
          <Text style={styles.totalBalanceLabel}>Saldo Disponible</Text>
          <Text style={styles.totalBalanceAmount}>
            {formatCurrency.format(681_639.6)}
          </Text>
        </View>
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={[styles.statsBadge, { backgroundColor: "#9ade7b" }]}>
              <Feather name="arrow-up" color="#101010" size={16} />
            </View>
            <View>
              <Text style={styles.transactionLabel}>Ingresos</Text>
              <Text style={styles.transactionAmount}>
                {formatCurrency.format(2_966_740)}
              </Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={[styles.statsBadge, { backgroundColor: "#f38585" }]}>
              <Feather name="arrow-down" color="#101010" size={16} />
            </View>
            <View>
              <Text style={styles.transactionLabel}>gastos</Text>
              <Text style={styles.transactionAmount}>
                {formatCurrency.format(830_000)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 25,
    backgroundColor: "#f5f5f5",
    gap: 20,
  },
  totalBalanceContainer: {
    width: "100%",
  },
  totalBalanceLabel: {
    fontSize: 15,
    fontWeight: 400,
    color: "#9d9ea2",
  },
  totalBalanceAmount: {
    fontSize: 30,
    fontWeight: 600,
    color: "#101010",
  },
  statsCard: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
  },
  statsRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statsBadge: {
    width: 36,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
  transactionLabel: {
    fontSize: 12,
    fontWeight: 400,
    color: "#9d9ea2",
  },
  transactionAmount: {
    fontSize: 12,
    fontWeight: 600,
    color: "#101010",
  },
});
