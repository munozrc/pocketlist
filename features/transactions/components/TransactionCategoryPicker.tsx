import { MaterialCommunityIcons } from "@expo/vector-icons";
import { type ComponentProps } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Text } from "@/components/ui";
import { colors } from "@/constants/theme";
import { TransactionTable, type TransactionType } from "@/database/schema";
import { scale, verticalScale } from "@/lib/scaling";

import { useTransactionCategories } from "../hooks";

type TransactionCategoryPickerProps = {
  currentType?: TransactionType;
  value?: typeof TransactionTable.$inferInsert.category;
  onChange: (value?: typeof TransactionTable.$inferInsert.category) => void;
};

type IconName = NonNullable<
  ComponentProps<typeof MaterialCommunityIcons>["name"]
>;

export function TransactionCategoryPicker({
  currentType,
  value,
  onChange,
}: TransactionCategoryPickerProps) {
  const { categories } = useTransactionCategories({ type: currentType });

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <View key={`category-${category.id}`} style={styles.wrapper}>
          <Pressable
            style={[
              styles.option,
              value === category.id && styles.optionActive,
            ]}
            onPress={() => onChange(category.id)}
            accessibilityRole="button"
          >
            <MaterialCommunityIcons
              name={category.defaultIcon as IconName}
              color={value === category.id ? colors.black : colors.white}
              size={scale(18)}
            />
            <Text
              color={value === category.id ? colors.black : colors.white}
              style={{ textAlign: "center" }}
              size={10}
            >
              {category.name}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wrapper: {
    width: "33.3%",
    height: verticalScale(70),
    paddingRight: verticalScale(8),
    paddingBottom: verticalScale(8),
  },
  option: {
    flex: 1,
    paddingHorizontal: verticalScale(10),
    backgroundColor: colors.darkBlue,
    borderRadius: verticalScale(12),
    justifyContent: "center",
    alignItems: "center",
  },
  optionActive: {
    backgroundColor: colors.lightBlue,
  },
});
