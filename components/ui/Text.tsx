import {
  Text as NativeText,
  type TextProps as NativeTextProps,
  type TextStyle,
} from "react-native";

import { colors } from "@/constants/theme";
import { verticalScale } from "@/lib/scaling";

type TextProps = NativeTextProps & {
  color?: TextStyle["color"];
  size?: TextStyle["fontSize"];
  fontWeight?: TextStyle["fontWeight"];
};

export function Text({
  children,
  color = colors.neutral800,
  size = 12,
  fontWeight = 400,
  style,
  ...restOfProps
}: TextProps) {
  return (
    <NativeText
      style={[{ fontSize: verticalScale(size), fontWeight, color }, style]}
      {...restOfProps}
    >
      {children}
    </NativeText>
  );
}
