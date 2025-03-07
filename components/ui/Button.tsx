import {
  type GestureResponderEvent,
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from "react-native";

import { colors } from "@/constants/theme";
import { verticalScale } from "@/lib/scaling";

interface ButtonProps {
  children: PressableProps["children"];
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  variant?: "primary" | "secondary";
  onPress?: (event: GestureResponderEvent) => void;
}

export function Button({
  children,
  disabled = false,
  style,
  variant = "primary",
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: verticalScale(12),
    borderCurve: "continuous",
    height: verticalScale(40),
  },
  primary: {
    backgroundColor: colors.lightBlue,
  },
  secondary: {
    backgroundColor: colors.darkBlue,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    backgroundColor: colors.grayLight,
  },
});
