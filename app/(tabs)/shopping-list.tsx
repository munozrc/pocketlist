import { StyleSheet } from "react-native";

import { BaseText, ScreenWrapper } from "@/components/ui";

export default function ShoppingListTab() {
  return (
    <ScreenWrapper style={styles.container}>
      <BaseText>shopping-list.tsx</BaseText>
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
