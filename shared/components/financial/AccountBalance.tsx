import { View } from "react-native";

import { colors } from "@shared/constants";
import { formatCurrency } from "@shared/utils";

import { BaseText } from "../ui";

type AccountBalanceProps = {
  amount?: number;
};

export function AccountBalance({ amount }: AccountBalanceProps) {
  return (
    <View style={{ width: "100%" }}>
      <BaseText size={13} color={colors.neutral800}>
        Saldo Disponible
      </BaseText>
      <BaseText size={27} color={colors.neutral800} fontWeight="600">
        {formatCurrency(amount)}
      </BaseText>
    </View>
  );
}
