import { Feather } from "@expo/vector-icons";
import { useMemo } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { Text } from "@/components/ui";
import { colors } from "@/constants/theme";
import { type WalletType } from "@/database/schema";
import { scale, verticalScale } from "@/lib/scaling";

import { financialEntities } from "../constants";

type FinancialEntityPickerProps = {
  value?: number | null;
  walletType?: WalletType;
  onChange: (id?: number) => void;
};

export function FinancialEntityPicker({
  value,
  walletType,
  onChange,
}: FinancialEntityPickerProps) {
  const entityOptions = useMemo(() => {
    return financialEntities.filter((entity) =>
      entity.supportedWalletTypes.some((type) => type === walletType),
    );
  }, [walletType]);

  const handlePress = (id: number) => () => {
    if (value === id) return onChange(undefined);
    onChange(id);
  };

  return (
    <View style={styles.container}>
      {entityOptions.map((option, index) => (
        <Pressable
          key={`item-${option.id}-${index}`}
          onPress={handlePress(option.id)}
          accessibilityRole="button"
          style={styles.option}
        >
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={option.brandIcon} />
          </View>
          <Text size={13} style={{ flex: 1 }}>
            {option.name}
          </Text>
          <View
            style={[styles.check, value === option.id && styles.checkActive]}
          >
            {value === option.id && (
              <Feather name="check" size={scale(18)} color={colors.black} />
            )}
          </View>
        </Pressable>
      ))}
      {!entityOptions.length && (
        <View style={[styles.option, styles.optionEmpty]}>
          <Text size={12} color={colors.grayDark}>
            No hay opciones disponibles
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: verticalScale(6),
  },
  option: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: verticalScale(55),
    borderRadius: verticalScale(12),
    paddingHorizontal: scale(10),
    paddingRight: scale(18),
    backgroundColor: colors.darkBlue,
    gap: verticalScale(12),
    overflow: "hidden",
  },
  optionEmpty: {
    paddingHorizontal: scale(14),
    height: verticalScale(44),
  },
  optionActive: {
    backgroundColor: colors.lightBlue,
    color: colors.black,
  },
  iconContainer: {
    width: scale(37),
    aspectRatio: 1,
    borderRadius: verticalScale(8),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: scale(37),
    objectFit: "scale-down",
  },
  check: {
    width: scale(22),
    borderRadius: verticalScale(50),
    borderColor: colors.darkGray,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    aspectRatio: 1,
  },
  checkActive: {
    backgroundColor: colors.lightBlue,
    borderColor: colors.lightBlue,
  },
});
