import { View } from "react-native";

import { BaseText } from "@/components/ui";
import { colors } from "@/constants/theme";
import { formatCurrency } from "@/utils/number-utils";

type AccountBalanceProps = {
  amount?: number;
};

export function AccountBalance({ amount }: AccountBalanceProps) {
  return (
    <View style={{ width: "100%" }}>
      <BaseText size={13} color={colors.neutral400}>
        Saldo Disponible
      </BaseText>
      <BaseText size={27} color={colors.text} fontWeight="600">
        {formatCurrency(amount)}
      </BaseText>
    </View>
  );
}
