import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { BaseText, ScreenWrapper } from "@shared/components/ui";
import { scale, verticalScale } from "@shared/utils";

export default function TransactionsTab() {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.container}>
          <BaseText fontWeight="600" size={25}>
            Billeteras
          </BaseText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/(modals)/create-wallet")}
          >
            <Feather name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: verticalScale(20),
    gap: verticalScale(10),
  },
  button: {
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    paddingVertical: verticalScale(8),
    alignItems: "center",
    gap: scale(4),
  },
});
