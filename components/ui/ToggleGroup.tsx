import { type Dispatch, type SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
          <Text
            style={[
              styles.textToggleOption,
              optionKey === selectedKey && styles.activeTextToggleOption,
            ]}
          >
            {options[optionKey]}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  toggleGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: 30,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  textToggleOption: {
    fontSize: 12,
    fontWeight: 400,
    color: "#767676",
  },
  activeToggleOption: {
    backgroundColor: "#404040",
  },
  activeTextToggleOption: {
    fontWeight: 600,
    color: "#fff",
  },
});
