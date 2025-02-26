import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

import { colors } from "@shared/constants";
import { scale, verticalScale } from "@shared/utils";

type Option<T> = {
  label: string;
  value: T;
};

type SelectProps<T> = {
  defaultOptionText?: string;
  isError?: boolean;
  mode?: "dropdown" | "dialog";
  options: Option<T>[];
  value?: T;
  onChange: (value: T, index: number) => void;
};

export function Select<T>({
  defaultOptionText = "Selecciona",
  isError = false,
  options,
  value,
  onChange,
  ...restOfProps
}: SelectProps<T>) {
  return (
    <View style={[styles.container, isError ? styles.error : undefined]}>
      <Picker
        style={styles.select}
        selectedValue={value}
        onValueChange={onChange}
        {...restOfProps}
      >
        <Picker.Item
          value=""
          label={defaultOptionText}
          style={{ ...styles.option, color: colors.neutral500 }}
        />
        {options.map((item) => (
          <Picker.Item
            key={`select-option-${item.value}`}
            label={item.label}
            style={styles.option}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: verticalScale(8),
    borderColor: colors.neutral300,
    padding: verticalScale(2),
    borderWidth: scale(1),
  },
  select: {
    flex: 1,
  },
  option: {
    fontSize: scale(12),
    color: colors.black,
  },
  error: {
    borderColor: colors.red,
  },
});
