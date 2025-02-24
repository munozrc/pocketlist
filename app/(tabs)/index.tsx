import { endOfToday, startOfToday } from "date-fns";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { TransactionCard } from "@features/transactions/components";
import { useTransactions } from "@features/transactions/hooks";
import { useTotalBalance } from "@features/wallet/hooks";
import {
  AccountBalance,
  IncomeExpenseCard,
} from "@shared/components/financial";
import { BaseText, ScreenWrapper, ToggleGroup } from "@shared/components/ui";
import { scale, verticalScale } from "@shared/utils";

const dateFilterOptions = {
  today: "Hoy",
  week: "Semana",
  month: "Mes",
  year: "Año",
} as const;

export default function HomeTab() {
  const [dateFilter, setDateFilter] =
    useState<keyof typeof dateFilterOptions>("month");

  const totalBalance = useTotalBalance();
  const { transactions, totalExpenses, totalIncome } = useTransactions({
    startDate: startOfToday(),
    finalDate: endOfToday(),
  });

  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.header}>
          <AccountBalance amount={totalBalance} />
          <ToggleGroup
            options={dateFilterOptions}
            selectedKey={dateFilter}
            onChange={setDateFilter}
          />
          <IncomeExpenseCard expenses={totalExpenses} income={totalIncome} />
        </View>
        <View style={styles.transactionSection}>
          <BaseText size={13} fontWeight={500}>
            Transacciones Recientes
          </BaseText>
          <View style={styles.transactionList}>
            {transactions.map((transaction) => (
              <TransactionCard
                key={`transaction-item-${transaction.id}`}
                {...transaction}
              />
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
