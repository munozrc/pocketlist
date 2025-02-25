import { Feather } from "@expo/vector-icons";
import { InferSelectModel } from "drizzle-orm";
import { StyleSheet, View } from "react-native";

import { BaseText } from "@shared/components/ui";
import { colors } from "@shared/constants";
import { transactions } from "@shared/schemas/transactions";
import { formatCurrency, scale, verticalScale } from "@shared/utils";

const dateFormat = Intl.DateTimeFormat("es-CO", {
  dateStyle: "short",
  timeStyle: "short",
});

type TransactionCardProps = InferSelectModel<typeof transactions>;

export function TransactionCard({
  title,
  category,
  amount,
  createdAt,
}: TransactionCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Feather name="alert-circle" size={scale(18)} />
        </View>
        <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
          <BaseText size={11} fontWeight={500}>
            {title}
          </BaseText>
          <BaseText size={8} color={colors.neutral400}>
            {category}
          </BaseText>
        </View>
      </View>
      <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
        <BaseText size={11} fontWeight={500}>
          {formatCurrency(amount)}
        </BaseText>
        <BaseText size={8} color={colors.neutral400}>
          {dateFormat.format(createdAt ?? new Date())}
        </BaseText>
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
