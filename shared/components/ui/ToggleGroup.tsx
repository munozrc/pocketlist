import { type Dispatch, type SetStateAction } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { colors } from "@shared/constants/theme";
import { scale, verticalScale } from "@shared/utils/scaling-utils";

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
            size={10}
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.neutral100,
    borderRadius: verticalScale(30),
    borderCurve: "continuous",
    overflow: "hidden",
  },
  toggleOption: {
    flex: 1,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(6),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: verticalScale(30),
    borderCurve: "continuous",
  },
  textToggleOption: {
    fontWeight: 500,
    color: colors.neutral900,
  },
  activeToggleOption: {
    backgroundColor: colors.neutral800,
  },
  activeTextToggleOption: {
    fontWeight: 600,
    color: colors.neutral100,
  },
});
