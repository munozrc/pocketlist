import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { isDate } from "date-fns";
import { useState } from "react";
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
  type ViewStyle,
} from "react-native";

import { colors } from "@/constants/theme";
import { scale, verticalScale } from "@/lib/scaling";

import { Text } from "./Text";

type DatePickerProps = {
  containerStyle?: StyleProp<ViewStyle>;
  isError?: boolean;
  mode?: "time" | "date";
  textStyle?: StyleProp<TextStyle>;
  value?: Date | null;
  onChangeDate: (value: Date | null) => void;
};

export function DatePicker({
  containerStyle,
  isError = false,
  value: currentValue,
  textStyle,
  mode: currentMode = "date",
  onChangeDate,
}: DatePickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === "set") {
      const currentValue = isDate(date) ? date : null;
      onChangeDate(currentValue);
      setShowDatePicker(false);
      return;
    }

    setShowDatePicker(false);
    onChangeDate(null);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          containerStyle,
          isError ? styles.error : undefined,
        ]}
      >
        <Pressable onPress={() => setShowDatePicker(true)}>
          <Text
            style={[
              styles.input,
              textStyle,
              !currentValue && styles.placeholder,
            ]}
          >
            {currentValue
              ? currentValue.toLocaleString("es-CO")
              : "Selecciona una fecha"}
          </Text>
        </Pressable>
      </View>
      {showDatePicker && (
        <DateTimePicker
          mode={currentMode}
          value={currentValue ?? new Date()}
          timeZoneName="America/Bogota"
          onChange={handleChange}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: verticalScale(12),
    borderColor: colors.darkBlue,
    backgroundColor: colors.darkBlue,
    paddingVertical: verticalScale(13),
    paddingHorizontal: scale(13),
    borderWidth: scale(1),
  },
  input: {
    flex: 1,
    fontSize: scale(12),
  },
  placeholder: {
    color: colors.neutral500,
  },
  error: {
    borderColor: colors.red,
  },
});
