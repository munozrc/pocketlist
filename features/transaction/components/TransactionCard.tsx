import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { Text } from "@/components/ui";
import { colors } from "@/constants/theme";
import { TransactionTable } from "@/database/schema";
import { formatCurrency } from "@/lib/formatters";
import { scale, verticalScale } from "@/lib/scaling";

import { transactionCategoryIcons } from "../constants";

const dateFormat = Intl.DateTimeFormat("es-CO", {
  dateStyle: "short",
  timeStyle: "short",
});

type TransactionCardProps = typeof TransactionTable.$inferSelect & {
  categoryName?: string;
};

export function TransactionCard({
  type,
  title,
  category,
  categoryName,
  amount,
  createdAt,
}: TransactionCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Feather
            name={transactionCategoryIcons[category] ?? "credit-card"}
            size={scale(16)}
          />
        </View>
        <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
          <Text size={11} fontWeight={500}>
            {title}
          </Text>
          <Text size={8} color={colors.neutral400}>
            {categoryName}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
        <Text
          size={11}
          fontWeight={500}
          color={type === "income" ? "#008a2e" : "#e60000"}
        >
          {`${type === "income" ? "+" : "-"}${formatCurrency(amount, { style: "decimal" })}`}
        </Text>
        <Text size={8} color={colors.neutral400}>
          {dateFormat.format(createdAt ?? new Date())}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.neutral50,
    paddingVertical: verticalScale(8),
    paddingLeft: scale(8),
    paddingRight: scale(12),
    borderRadius: verticalScale(5),
    borderCurve: "continuous",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  icon: {
    aspectRatio: 1,
    width: scale(36),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.neutral200,
    borderRadius: verticalScale(5),
    borderCurve: "continuous",
  },
});
