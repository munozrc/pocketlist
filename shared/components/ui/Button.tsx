import {
  Pressable,
  type PressableProps,
  StyleSheet,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors } from "@shared/constants";
import { verticalScale } from "@shared/utils";

interface ButtonProps {
  children: PressableProps["children"];
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

export function Button({
  children,
  disabled = false,
  style,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
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
    borderRadius: verticalScale(8),
    backgroundColor: colors.neutral800,
    borderCurve: "continuous",
    height: verticalScale(52),
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    backgroundColor: colors.neutral700,
  },
});
