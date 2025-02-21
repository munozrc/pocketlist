import { StatusBar } from "expo-status-bar";
import { type ReactNode } from "react";
import { type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/theme";

type ScreenWrapperProps = {
  backgroundColor?: ViewStyle["backgroundColor"];
  children: ReactNode;
  style?: ViewStyle;
};

export function ScreenWrapper({
  backgroundColor = colors.white,
  children,
  style,
}: ScreenWrapperProps) {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor }, style]}>
      {children}
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
