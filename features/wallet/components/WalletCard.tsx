import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native";

import { Text } from "@/components/ui";
import { colors } from "@/constants/theme";
import { WalletTable } from "@/database/schema";
import { formatCurrency } from "@/lib/formatters";
import { scale, verticalScale } from "@/lib/scaling";

import { financialEntities } from "../constants";

type WalletCardProps = typeof WalletTable.$inferSelect & {};

export function WalletCard({
  balance,
  financialEntityId,
  totalExpenses,
  totalIncome,
  name,
}: WalletCardProps) {
  const financialEntitySelected = financialEntities.find(
    (entity) => entity.id === financialEntityId,
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.info}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={financialEntitySelected?.brandIcon}
            />
          </View>
          <View>
            <Text size={12} color={colors.grayLight}>
              {name.toLowerCase() ===
              financialEntitySelected?.name?.toLowerCase()
                ? financialEntitySelected.name
                : name}
            </Text>
            <Text size={14} fontWeight={600}>
              {formatCurrency(balance)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.income}>
          <Feather
            name="arrow-up-left"
            size={verticalScale(20)}
            color={colors.green}
          />
          <View>
            <Text size={10}>{formatCurrency(totalIncome)}</Text>
            <Text size={8} color={colors.grayMedium} fontWeight={600}>
              Ingresos
            </Text>
          </View>
        </View>
        <View style={styles.expense}>
          <Feather
            name="arrow-down-right"
            size={verticalScale(20)}
            color={colors.red}
          />
          <View>
            <Text size={10}>{formatCurrency(totalExpenses)}</Text>
            <Text size={8} color={colors.grayMedium} fontWeight={600}>
              Gastos
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: verticalScale(4),
  },
  header: {
    width: "100%",
    backgroundColor: colors.darkBlue,
    borderTopLeftRadius: verticalScale(16),
    borderTopRightRadius: verticalScale(16),
    borderBottomLeftRadius: verticalScale(4),
    borderBottomRightRadius: verticalScale(4),
    padding: verticalScale(12),
  },
  info: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: verticalScale(12),
  },
  iconContainer: {
    width: scale(46),
    borderRadius: verticalScale(8),
    overflow: "hidden",
    aspectRatio: 1,
  },
  icon: {
    width: scale(46),
    height: scale(46),
    objectFit: "scale-down",
    aspectRatio: 1,
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    gap: verticalScale(4),
  },
  income: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.darkBlue,
    borderTopLeftRadius: verticalScale(4),
    borderTopRightRadius: verticalScale(4),
    borderBottomLeftRadius: verticalScale(16),
    borderBottomRightRadius: verticalScale(4),
    padding: verticalScale(8),
    gap: verticalScale(8),
  },
  expense: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.darkBlue,
    borderTopLeftRadius: verticalScale(4),
    borderTopRightRadius: verticalScale(4),
    borderBottomLeftRadius: verticalScale(4),
    borderBottomRightRadius: verticalScale(16),
    padding: verticalScale(8),
    gap: verticalScale(8),
  },
});
