import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { ScreenWrapper, ToggleGroup } from "@/components/ui";
import { AccountBalance, StatsCard } from "@/features/home/components";
import { scale, verticalScale } from "@/utils/scaling-utils";

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
          <StatsCard expenses={830_000} income={2_966_740} />
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
});
