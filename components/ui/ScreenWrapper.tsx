import { StatusBar } from "expo-status-bar";
import { type ReactNode } from "react";
import { type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/theme";

type ScreenWrapperProps = {
  styles?: ViewStyle;
  children: ReactNode;
  bgColor?: ViewStyle["backgroundColor"];
};

export function ScreenWrapper({ children, styles }: ScreenWrapperProps) {
  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: colors.neutral900 }, styles]}
    >
      {children}
      <StatusBar style="light" backgroundColor={colors.neutral900} />
    </SafeAreaView>
  );
}
