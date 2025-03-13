import { Pressable, StyleSheet, View } from "react-native";

import { Text } from "@/components/ui";
import { colors } from "@/constants/theme";
import { type TransactionType } from "@/database/schema";
import { scale, verticalScale } from "@/lib/scaling";

type TransactionTypePickerProps = {
  value?: TransactionType;
  onChange: (value?: TransactionType) => void;
};

export function TransactionTypePicker({
  value,
  onChange,
}: TransactionTypePickerProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        onPress={() => onChange("income")}
        style={[
          styles.option,
          value === "income" ? styles.incomeActive : styles.income,
        ]}
      >
        <Text
          color={value === "income" ? colors.black : colors.green}
          fontWeight={500}
        >
          Ingreso
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={() => onChange("expense")}
        style={[
          styles.option,
          value === "expense" ? styles.expenseActive : styles.expense,
        ]}
      >
        <Text
          color={value === "expense" ? colors.black : colors.red}
          fontWeight={500}
        >
          Gasto
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: scale(8),
  },
  option: {
    flex: 1,
    height: verticalScale(36),
    backgroundColor: colors.black,
    borderRadius: verticalScale(10),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  income: {
    borderColor: colors.green,
    backgroundColor: colors.black,
    color: colors.green,
    opacity: 0.6,
  },
  incomeActive: {
    borderColor: colors.green,
    backgroundColor: colors.green,
    color: colors.black,
  },
  expense: {
    borderColor: colors.red,
    backgroundColor: colors.black,
    color: colors.red,
    opacity: 0.6,
  },
  expenseActive: {
    borderColor: colors.red,
    backgroundColor: colors.red,
    color: colors.black,
  },
});
