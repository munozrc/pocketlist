import { Text, type TextProps, type TextStyle } from "react-native";

import { colors } from "@shared/constants";
import { verticalScale } from "@shared/utils";

type BaseTextProps = TextProps & {
  color?: TextStyle["color"];
  size?: TextStyle["fontSize"];
  fontWeight?: TextStyle["fontWeight"];
};

export function BaseText({
  children,
  color = colors.neutral800,
  size = 12,
  fontWeight = 400,
  style,
  ...restOfProps
}: BaseTextProps) {
  return (
    <Text
      style={[{ fontSize: verticalScale(size), fontWeight, color }, style]}
      {...restOfProps}
    >
      {children}
    </Text>
  );
}
