import { StyleSheet } from "react-native";

import { BaseText, ScreenWrapper } from "@/components/ui";

export default function TransactionsTab() {
  return (
    <ScreenWrapper style={styles.container}>
      <BaseText>transactions.tsx</BaseText>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
