import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { ScreenWrapper } from "@/components/layouts";
import { Button, Text } from "@/components/ui";
import { colors } from "@/constants/theme";
import { WalletCard } from "@/features/wallets/components";
import { useWallets } from "@/features/wallets/hooks";
import { scale, verticalScale } from "@/lib/scaling";

export default function TransactionsTab() {
  const { wallets } = useWallets();
  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.container}>
          <Text fontWeight="600" size={25}>
            Mis Billeteras
          </Text>
          <Button onPress={() => router.push("/(modals)/create-wallet")}>
            <Feather name="plus" size={24} color={colors.black} />
          </Button>
          <View style={styles.wallets}>
            {wallets.map((wallet, index) => (
              <WalletCard key={`wallet-${wallet.id}-${index}`} {...wallet} />
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(12),
    paddingHorizontal: scale(20),
    gap: verticalScale(18),
  },
  wallets: {
    flex: 1,
    gap: verticalScale(20),
  },
});
