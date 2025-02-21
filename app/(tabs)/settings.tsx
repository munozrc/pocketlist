import { StyleSheet } from "react-native";

import { BaseText, ScreenWrapper } from "@shared/components/ui";

export default function SettingsTab() {
  return (
    <ScreenWrapper style={styles.container}>
      <BaseText>settings.tsx</BaseText>
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
