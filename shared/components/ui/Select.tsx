import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

import { colors } from "@shared/constants";
import { scale, verticalScale } from "@shared/utils";

type Option<T> = {
  label: string;
  value: T;
};

type SelectProps<T> = {
  options: Option<T>[];
  mode?: "dropdown" | "dialog";
  value?: T;
  onChange: (value: T, index: number) => void;
};

export function Select<T>({
  options,
  value,
  onChange,
  ...restOfProps
}: SelectProps<T>) {
  return (
    <View style={styles.container}>
      <Picker
        style={styles.select}
        selectedValue={value}
        onValueChange={onChange}
        {...restOfProps}
      >
        <Picker.Item value="" label="Selecciona" />
        {options.map((item) => (
          <Picker.Item
            key={`select-option-${item.value}`}
            label={item.label}
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
});
