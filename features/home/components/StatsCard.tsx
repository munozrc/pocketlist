import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { BaseText } from "@/components/ui";
import { colors } from "@/constants/theme";
import { formatCurrency } from "@/utils/number-utils";
import { scale, verticalScale } from "@/utils/scaling-utils";

type StatsCardProps = {
  income?: number;
  expenses?: number;
};

export function StatsCard({ income, expenses }: StatsCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.badge, { backgroundColor: colors.green }]}>
          <Feather name="arrow-up" color={colors.black} size={16} />
        </View>
        <View>
          <BaseText style={styles.label}>Ingresos</BaseText>
          <BaseText style={styles.amount}>{formatCurrency(income)}</BaseText>
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.badge, { backgroundColor: colors.red }]}>
          <Feather name="arrow-down" color={colors.black} size={16} />
        </View>
        <View>
          <BaseText style={styles.label}>Gastos</BaseText>
          <BaseText style={styles.amount}>{formatCurrency(expenses)}</BaseText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: colors.neutral100,
    borderRadius: verticalScale(8),
    padding: verticalScale(10),
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: verticalScale(8),
  },
  badge: {
    width: scale(26),
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  label: {
    fontSize: verticalScale(9),
    color: colors.neutral500,
  },
  amount: {
    fontSize: verticalScale(11),
    color: colors.neutral800,
    fontWeight: 500,
  },
});
