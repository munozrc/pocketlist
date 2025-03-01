import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { ScreenWrapper } from "@/components/layouts";
import { Text } from "@/components/ui";
import { scale, verticalScale } from "@/lib/scaling";

export default function TransactionsTab() {
  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.container}>
          <Text fontWeight="600" size={25}>
            Billeteras
          </Text>
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
