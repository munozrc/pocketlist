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
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { ScreenWrapper } from "@/components/layouts";
import { Text } from "@/components/ui";
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
    DATE_FILTER_VALUES[selectedDateFilter]
  );
  const { transactions } = useTransactions(
    DATE_FILTER_VALUES[selectedDateFilter]
  );
  const { totalBalance } = useTotalBalance();

  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.balanceContainer}>
            <Text size={13} color={colors.neutral800}>
              Saldo Disponible
            </Text>
            <Text size={27} color={colors.neutral800} fontWeight="600">
              {formatCurrency(totalBalance)}
            </Text>
          </View>

          {/* Date filters */}
          <View style={styles.dateFilterContainer}>
            {Object.keys(DATE_FILTER_OPTIONS).map((filterKey) => (
              <TouchableOpacity
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
            <View style={styles.summaryRow}>
              <View
                style={[styles.iconBadge, { backgroundColor: colors.green }]}
              >
                <Feather name="arrow-up" color={colors.black} size={16} />
              </View>
              <View>
                <Text style={styles.summaryLabel}>Ingresos</Text>
                <Text style={styles.summaryAmount}>
                  {formatCurrency(totalIncome)}
                </Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <View style={[styles.iconBadge, { backgroundColor: colors.red }]}>
                <Feather name="arrow-down" color={colors.black} size={16} />
              </View>
              <View>
                <Text style={styles.summaryLabel}>Gastos</Text>
                <Text style={styles.summaryAmount}>
                  {formatCurrency(totalExpenses)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.transactionSection}>
          <Text size={13} fontWeight={500}>
            Transacciones Recientes
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
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(14),
    paddingHorizontal: verticalScale(14),
    gap: scale(16),
  },
  balanceContainer: {
    flex: 1,
  },
  dateFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.neutral100,
    borderRadius: verticalScale(30),
    overflow: "hidden",
  },
  dateFilterButton: {
    flex: 1,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(6),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: verticalScale(30),
  },
  dateFilterText: {
    fontWeight: 500,
    color: colors.neutral900,
  },
  activeDateFilterButton: {
    backgroundColor: colors.neutral800,
  },
  activeDateFilterText: {
    fontWeight: 600,
    color: colors.neutral100,
  },
  summaryCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.neutral100,
    borderRadius: verticalScale(8),
    padding: verticalScale(10),
  },
  summaryRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: verticalScale(8),
  },
  iconBadge: {
    width: scale(26),
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: verticalScale(50),
  },
  summaryLabel: {
    fontSize: verticalScale(9),
    color: colors.neutral500,
  },
  summaryAmount: {
    fontSize: verticalScale(11),
    color: colors.neutral800,
    fontWeight: 500,
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
