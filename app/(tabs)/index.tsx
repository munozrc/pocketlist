import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { TransactionCard } from "@features/transactions/components";
import {
  AccountBalance,
  IncomeExpenseCard,
} from "@shared/components/financial";
import { BaseText, ScreenWrapper, ToggleGroup } from "@shared/components/ui";
import { scale, verticalScale } from "@shared/utils/scaling-utils";

const dateFilterOptions = {
  today: "Hoy",
  week: "Semana",
  month: "Mes",
  year: "Año",
} as const;

export default function HomeTab() {
  const [dateFilter, setDateFilter] =
    useState<keyof typeof dateFilterOptions>("month");

  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.header}>
          <AccountBalance amount={681_639.6} />
          <ToggleGroup
            options={dateFilterOptions}
            selectedKey={dateFilter}
            onChange={setDateFilter}
          />
          <IncomeExpenseCard expenses={830_000} income={2_966_740} />
        </View>
        <View style={styles.transactionSection}>
          <BaseText size={13} fontWeight={500}>
            Transacciones Recientes
          </BaseText>
          <View style={styles.transactionList}>
            {[0, 1, 3, 4, 5, 6, 7, 8, 9].map((value) => (
              <TransactionCard key={`transaction-item-${value}`} />
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingVertical: verticalScale(14),
    paddingHorizontal: verticalScale(14),
    gap: scale(16),
  },
  transactionSection: {
    flex: 1,
    paddingVertical: verticalScale(14),
    paddingHorizontal: verticalScale(14),
    gap: scale(12),
  },
  transactionList: {
    flex: 1,
    gap: scale(6),
  },
});
