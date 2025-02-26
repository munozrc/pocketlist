import {
  type KeyboardTypeOptions,
  type StyleProp,
  StyleSheet,
  TextInput,
  type TextStyle,
  View,
  type ViewStyle,
} from "react-native";

import { colors } from "@shared/constants";
import { scale, verticalScale } from "@shared/utils";

type InputProps<T> = {
  containerStyle?: StyleProp<ViewStyle>;
  isError?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  textStyle?: StyleProp<TextStyle>;
  value: T;
  onChangeNumber?: (value?: number) => void;
  onChangeText?: (value?: string) => void;
};

export function Input<T>({
  containerStyle,
  isError = false,
  textStyle,
  value,
  onChangeNumber,
  onChangeText,
  ...restOfProps
}: InputProps<T>) {
  const handleChange = (value: string) => {
    const parseValue = !isNaN(Number(value)) ? Number(value) : undefined;
    onChangeNumber && onChangeNumber(parseValue);
    onChangeText && onChangeText(value);
  };

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        isError ? styles.error : undefined,
      ]}
    >
      <TextInput
        style={[styles.input, textStyle]}
        value={value ? String(value) : undefined}
        onChangeText={handleChange}
        {...restOfProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: verticalScale(8),
    borderColor: colors.neutral300,
    paddingVertical: verticalScale(7),
    paddingHorizontal: scale(10),
    borderWidth: scale(1),
  },
  input: {
    flex: 1,
    fontSize: scale(12),
  },
  error: {
    borderColor: colors.red,
  },
});
