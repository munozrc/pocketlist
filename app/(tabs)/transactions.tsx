import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function TransactionsTab() {
  return (
    <View style={styles.container}>
      <Text>transactions.tsx</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
