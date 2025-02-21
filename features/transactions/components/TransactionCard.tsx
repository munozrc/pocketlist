import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { BaseText } from "@shared/components/ui";
import { colors } from "@shared/constants/theme";
import { formatCurrency } from "@shared/utils/number-utils";
import { scale, verticalScale } from "@shared/utils/scaling-utils";

const temporalDate = new Date().toLocaleString("es-CO", {
  dateStyle: "short",
  timeStyle: "short",
});

export function TransactionCard() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Feather name="alert-circle" size={scale(18)} />
        </View>
        <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
          <BaseText size={12} fontWeight={500}>
            Suscripción Netflix
          </BaseText>
          <BaseText size={10} color={colors.neutral400}>
            Entretenimiento
          </BaseText>
        </View>
      </View>
      <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
        <BaseText size={12} fontWeight={500}>
          {formatCurrency(26_350)}
        </BaseText>
        <BaseText size={10} color={colors.neutral400}>
          {temporalDate}
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
