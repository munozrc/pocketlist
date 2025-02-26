import { InferInsertModel } from "drizzle-orm";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import { walletTypes } from "@features/wallet/constants";
import {
  BaseText,
  Button,
  Input,
  ScreenWrapper,
  Select,
} from "@shared/components/ui";
import { colors } from "@shared/constants";
import { useDatabase } from "@shared/contexts";
import { wallets } from "@shared/schemas/wallets";
import { scale, verticalScale } from "@shared/utils";

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
  const { db, schemas } = useDatabase();
  const router = useRouter();

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
      await db.insert(schemas.wallets).values([payload]);
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
          <BaseText size={25} fontWeight="700">
            Crear Billetera
          </BaseText>
          <View>
            <Input
              value={formState.name}
              placeholder="Nombre"
              onChangeText={handleChange("name")}
              isError={!!errors.name}
            />
            {errors.name && (
              <BaseText size={12} color={colors.red}>
                {errors.name}
              </BaseText>
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
              <BaseText size={12} color={colors.red}>
                {errors.balance}
              </BaseText>
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
              <BaseText size={12} color={colors.red}>
                {errors.type}
              </BaseText>
            )}
          </View>
          <Button
            onPress={handleSubmit}
            disabled={status === "pending" || status === "success"}
          >
            <BaseText color={colors.white} size={14} fontWeight={600}>
              Crear
            </BaseText>
          </Button>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
