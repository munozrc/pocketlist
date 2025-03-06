import { MaterialCommunityIcons } from "@expo/vector-icons";
import { type ComponentProps } from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "@/components/ui";
import { colors } from "@/constants/theme";
import { TransactionTable } from "@/database/schema";
import { formatCurrency } from "@/lib/formatters";
import { scale, verticalScale } from "@/lib/scaling";

const dateFormat = Intl.DateTimeFormat("es-CO", {
  dateStyle: "short",
  timeStyle: "short",
});

type TransactionCardProps = typeof TransactionTable.$inferSelect & {
  categoryColor: string;
  categoryIcon: string;
  categoryName: string;
};

type IconName = NonNullable<
  ComponentProps<typeof MaterialCommunityIcons>["name"]
>;

export function TransactionCard({
  type,
  title,
  categoryColor,
  categoryIcon,
  categoryName,
  amount,
  createdAt,
}: TransactionCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.icon, { backgroundColor: categoryColor }]}>
          <MaterialCommunityIcons
            name={categoryIcon as IconName}
            size={scale(24)}
          />
        </View>
        <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
          <Text size={11} fontWeight="bold" color={colors.white}>
            {title}
          </Text>
          <Text size={9} color={colors.grayDark}>
            {categoryName}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
        <Text
          size={12}
          fontWeight={500}
          color={type === "income" ? colors.green : colors.red}
        >
          {`${type === "income" ? "+" : "-"}${formatCurrency(amount, { style: "decimal" })}`}
        </Text>
        <Text size={9} color={colors.grayDark}>
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
    backgroundColor: colors.darkBlue,
    paddingVertical: verticalScale(8),
    paddingLeft: scale(8),
    paddingRight: scale(12),
    borderRadius: verticalScale(12),
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
    width: scale(40),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.neutral200,
    borderRadius: verticalScale(8),
    borderCurve: "continuous",
  },
});
