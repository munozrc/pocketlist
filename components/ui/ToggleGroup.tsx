import { type Dispatch, type SetStateAction } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/theme";
import { verticalScale } from "@/utils/scaling-utils";

import { BaseText } from "./BaseText";

type ToggleGroupProps<T extends string | number> = {
  options: Record<T, string>;
  selectedKey?: T;
  onChange: Dispatch<SetStateAction<T>> | ((value: T) => void);
};

export function ToggleGroup<T extends string | number>({
  options,
  selectedKey,
  onChange,
}: ToggleGroupProps<T>) {
  const handleOptionSelect = (value: T) => () => {
    onChange(value);
  };

  return (
    <View style={styles.toggleGroup}>
      {(Object.keys(options) as T[]).map((optionKey, index) => (
        <TouchableOpacity
          key={`toggle-option-${optionKey}-${index}`}
          style={[
            styles.toggleOption,
            optionKey === selectedKey && styles.activeToggleOption,
          ]}
          onPress={handleOptionSelect(optionKey)}
        >
          <BaseText
            size={11}
            style={[
              styles.textToggleOption,
              optionKey === selectedKey && styles.activeTextToggleOption,
            ]}
          >
            {options[optionKey]}
          </BaseText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  toggleGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.neutral700,
    borderRadius: verticalScale(30),
    borderCurve: "continuous",
    overflow: "hidden",
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: verticalScale(30),
    borderCurve: "continuous",
  },
  textToggleOption: {
    fontWeight: 400,
    color: colors.textLighter,
  },
  activeToggleOption: {
    backgroundColor: colors.neutral100,
  },
  activeTextToggleOption: {
    fontWeight: 600,
    color: colors.black,
  },
});
