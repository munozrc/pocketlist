import { Alert, ScrollView, View } from "react-native";
import { InferInsertModel } from "drizzle-orm";
import { router } from "expo-router";
import { useState } from "react";

import { Button, Input, Select, Text } from "@/components/ui";
import { colors } from "@/constants/theme";
import { db } from "@/database/init";
import { scale, verticalScale } from "@/lib/scaling";
import { ScreenWrapper } from "@/components/layouts";
import { wallets } from "@/database/schema";
import { walletTypes } from "@/features/wallet/constants";

const walletTypeOptions = Object.keys(walletTypes).map((key) => ({
  label: walletTypes[key as keyof typeof walletTypes],
  value: key,
}));

type WalletFormState = InferInsertModel<typeof wallets>;
type WalletErrorsState = Record<keyof WalletFormState, string>;
type WalletFormStatus = "success" | "pending" | "error" | "idle";

export default function CreateWallet() {
  const [formState, setFormState] = useState<Partial<WalletFormState>>({});
  const [errors, setErrors] = useState<Partial<WalletErrorsState>>({});
  const [status, setStatus] = useState<WalletFormStatus>("idle");

  const handleChange = (name: keyof typeof formState) => (value?: unknown) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    const { balance, name, type } = formState;
    const newErrors: Partial<WalletErrorsState> = {};

    if (status === "pending" || status === "success") {
      return;
    }

    if (!name || !name.trim().length) {
      newErrors.name = "Ingresa un nombre";
    }
    if (!balance || isNaN(balance)) {
      newErrors.balance = "Ingresa un valor";
    }
    if (!type || typeof walletTypes[type] !== "string") {
      newErrors.type = "Selecciona un tipo";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("pending");

    const payload: WalletFormState = {
      balance: balance ?? 0,
      currency: "COP",
      name: name?.trim() ?? "",
      totalExpenses: 0,
      totalIncome: balance ?? 0,
      type: type ?? "bank",
    };

    try {
      await db.insert(wallets).values([payload]);
      setStatus("success");

      Alert.alert("Éxito", "Billetera creada correctamente.", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    } catch {
      setStatus("error");
      Alert.alert(
        "Error",
        "Hubo un problema al crear la billetera. Inténtalo de nuevo."
      );
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView>
        <View
          style={{
            width: "100%",
            paddingVertical: verticalScale(14),
            paddingHorizontal: verticalScale(14),
            gap: scale(16),
          }}
        >
          <Text size={25} fontWeight="700">
            Crear Billetera
          </Text>
          <View>
            <Input
              value={formState.name}
              placeholder="Nombre"
              onChangeText={handleChange("name")}
              isError={!!errors.name}
            />
            {errors.name && (
              <Text size={12} color={colors.red}>
                {errors.name}
              </Text>
            )}
          </View>
          <View>
            <Input
              keyboardType="number-pad"
              value={formState.balance}
              placeholder="Saldo"
              onChangeNumber={handleChange("balance")}
              isError={!!errors.balance}
            />
            {errors.balance && (
              <Text size={12} color={colors.red}>
                {errors.balance}
              </Text>
            )}
          </View>
          <View>
            <Select
              value={formState.type}
              options={walletTypeOptions}
              defaultOptionText="Selecciona un tipo"
              onChange={handleChange("type")}
              isError={!!errors.type}
            />
            {errors.type && (
              <Text size={12} color={colors.red}>
                {errors.type}
              </Text>
            )}
          </View>
          <Button
            onPress={handleSubmit}
            disabled={status === "pending" || status === "success"}
          >
            <Text color={colors.white} size={14} fontWeight={600}>
              Crear
            </Text>
          </Button>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
