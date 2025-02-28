import { StyleSheet } from "react-native";

import { ScreenWrapper } from "@/components/layouts";
import { Text } from "@/components/ui";

export default function ShoppingListTab() {
  return (
    <ScreenWrapper style={styles.container}>
      <Text>shopping-list.tsx</Text>
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
