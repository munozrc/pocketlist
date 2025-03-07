import { Feather } from "@expo/vector-icons";
import {
  endOfMonth,
  endOfToday,
  endOfWeek,
  endOfYear,
  endOfYesterday,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
  startOfYesterday,
} from "date-fns";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { ScreenWrapper } from "@/components/layouts";
import { Button, Text } from "@/components/ui";
import { colors } from "@/constants/theme";
import { TransactionCard } from "@/features/transaction/components";
import {
  useTransactions,
  useTransactionSummary,
} from "@/features/transaction/hooks";
import { useTotalBalance } from "@/features/wallet/hooks";
import { formatCurrency } from "@/lib/formatters";
import { scale, verticalScale } from "@/lib/scaling";

const DATE_FILTER_OPTIONS = {
  TODAY: "Hoy",
  YESTERDAY: "Ayer",
  WEEK: "Semana",
  MONTH: "Mes",
  YEAR: "Año",
} as const;

const DATE_FILTER_VALUES = {
  TODAY: {
    startDate: startOfToday(),
    endDate: endOfToday(),
  },
  YESTERDAY: {
    startDate: startOfYesterday(),
    endDate: endOfYesterday(),
  },
  WEEK: {
    startDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
    endDate: endOfWeek(new Date(), { weekStartsOn: 1 }),
  },
  MONTH: {
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
  },
  YEAR: {
    startDate: startOfYear(new Date()),
    endDate: endOfYear(new Date()),
  },
} as const;

type DateFilterKey = keyof typeof DATE_FILTER_OPTIONS;

export default function HomeTab() {
  const [selectedDateFilter, setSelectedDateFilter] =
    useState<DateFilterKey>("WEEK");
  const { totalExpenses, totalIncome } = useTransactionSummary(
    DATE_FILTER_VALUES[selectedDateFilter],
  );
  const { transactions } = useTransactions(
    DATE_FILTER_VALUES[selectedDateFilter],
  );
  const { totalBalance } = useTotalBalance();

  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.balanceContainer}>
            <Text size={9} color={colors.grayMedium} fontWeight={600}>
              SALDO DISPONIBLE
            </Text>
            <Text size={26} color={colors.white} fontWeight="600">
              {formatCurrency(totalBalance)}
            </Text>
          </View>

          {/* Date filters */}
          <View style={styles.dateFilterContainer}>
            {Object.keys(DATE_FILTER_OPTIONS).map((filterKey) => (
              <TouchableOpacity
                accessibilityRole="button"
                key={`date-filter-${filterKey}`}
                style={[
                  styles.dateFilterButton,
                  filterKey === selectedDateFilter &&
                    styles.activeDateFilterButton,
                ]}
                onPress={() =>
                  setSelectedDateFilter(filterKey as DateFilterKey)
                }
              >
                <Text
                  size={10}
                  style={[
                    styles.dateFilterText,
                    filterKey === selectedDateFilter &&
                      styles.activeDateFilterText,
                  ]}
                >
                  {DATE_FILTER_OPTIONS[filterKey as DateFilterKey]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Income and expense card */}
          <View style={styles.summaryCard}>
            <View
              style={[styles.summaryRow, { backgroundColor: colors.green }]}
            >
              <Feather name="arrow-up-left" color={colors.black} size={24} />
              <View>
                <Text style={styles.summaryAmount}>
                  {formatCurrency(totalIncome)}
                </Text>
                <Text style={styles.summaryLabel}>Ingresos</Text>
              </View>
            </View>

            <View style={[styles.summaryRow, { backgroundColor: colors.red }]}>
              <Feather name="arrow-down-right" color={colors.black} size={24} />
              <View>
                <Text style={styles.summaryAmount}>
                  {formatCurrency(totalExpenses)}
                </Text>
                <Text style={styles.summaryLabel}>Gastos</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.transactionSection}>
          <Text size={13} fontWeight={500} color={colors.white}>
            Transacciones
          </Text>
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
      <Button
        style={styles.button}
        onPress={() => router.push("/(modals)/create-transaction")}
      >
        <Feather name="plus" color={colors.black} size={30} />
      </Button>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(14),
    paddingHorizontal: verticalScale(14),
    gap: scale(8),
  },
  balanceContainer: {
    flex: 1,
    marginBottom: verticalScale(20),
  },
  dateFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.darkBlue,
    borderRadius: verticalScale(30),
    overflow: "hidden",
  },
  dateFilterButton: {
    flex: 1,
    paddingVertical: verticalScale(8),
    borderRadius: verticalScale(30),
    paddingHorizontal: scale(6),
    justifyContent: "center",
    alignItems: "center",
  },
  dateFilterText: {
    fontWeight: 500,
    color: colors.grayLight,
  },
  activeDateFilterButton: {
    backgroundColor: colors.lightBlue,
  },
  activeDateFilterText: {
    fontWeight: 700,
    color: colors.black,
  },
  summaryCard: {
    flex: 1,
    flexDirection: "row",
    gap: scale(6),
  },
  summaryRow: {
    flex: 1,
    height: scale(52),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: verticalScale(12),
    paddingHorizontal: scale(12),
    gap: verticalScale(6),
  },
  summaryLabel: {
    fontSize: verticalScale(9),
    color: colors.black,
  },
  summaryAmount: {
    fontSize: verticalScale(12),
    color: colors.black,
    fontWeight: 700,
  },
  transactionSection: {
    flex: 1,
    paddingVertical: verticalScale(14),
    paddingHorizontal: verticalScale(14),
    gap: scale(6),
  },
  transactionList: {
    flex: 1,
    gap: scale(6),
  },
  button: {
    position: "absolute",
    borderRadius: verticalScale(30),
    width: verticalScale(48),
    height: verticalScale(48),
    bottom: verticalScale(20),
    aspectRatio: 1,
    right: "43%",
  },
});
