import { useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  type TextStyle,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
} from "react-native";

import { colors } from "@/constants/theme";
import { type Currency } from "@/database/schema";
import { scale, verticalScale } from "@/lib/scaling";

import { Text } from "./Text";

type CurrencyInputProps = {
  containerStyle?: ViewStyle;
  currency?: Currency;
  isError?: boolean;
  placeholder?: string;
  textStyle?: TextStyle;
  value: number | undefined;
  onChangeNumber: (value?: number) => void;
};

export function CurrencyInput({
  currency = "COP",
  value,
  containerStyle,
  isError = false,
  textStyle,
  onChangeNumber,
  ...restOfProps
}: CurrencyInputProps) {
  const [formattedValue, setFormattedValue] = useState<string | undefined>(
    value?.toString(),
  );

  const inputRef = useRef<TextInput>(null);

  const handleChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (!numericValue.length || numericValue === "00") {
      setFormattedValue(undefined);
      onChangeNumber(undefined);
      return;
    }

    const parseValue = parseInt(numericValue, 10) / 100;
    const formattedValue = parseValue.toLocaleString(undefined, {
      style: "currency",
      signDisplay: "never",
      currency,
    });

    setFormattedValue(formattedValue);
    onChangeNumber(parseValue);
  };

  return (
    <TouchableWithoutFeedback
      accessibilityRole="text"
      onPress={() => inputRef.current?.focus()}
    >
      <View
        style={[
          styles.container,
          containerStyle,
          isError ? styles.error : undefined,
        ]}
      >
        {formattedValue && (
          <Text style={[styles.displayCurrency, textStyle]}>{currency}</Text>
        )}
        <TextInput
          ref={inputRef}
          accessibilityRole="text"
          style={[styles.input, textStyle]}
          value={formattedValue ? String(formattedValue) : undefined}
          placeholderTextColor={colors.grayDark}
          onChangeText={handleChange}
          keyboardType="numeric"
          {...restOfProps}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: verticalScale(44),
    borderRadius: verticalScale(12),
    borderColor: colors.black,
    paddingHorizontal: scale(13),
    backgroundColor: colors.darkBlue,
    borderWidth: scale(1),
    gap: scale(2),
  },
  input: {
    color: colors.white,
    fontSize: scale(13),
  },
  displayCurrency: {
    color: colors.lightBlue,
    fontSize: scale(13),
    fontWeight: 600,
  },
  error: {
    borderColor: colors.red,
  },
});
