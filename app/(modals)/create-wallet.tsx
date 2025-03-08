import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import { ScreenWrapper } from "@/components/layouts";
import { Button, Select, Text } from "@/components/ui";
import { colors } from "@/constants/theme";
import { db } from "@/database/init";
import { WalletTable } from "@/database/schema";
import { FinancialEntityPicker } from "@/features/wallet/components";
import { walletTypes } from "@/features/wallet/constants";
import { scale, verticalScale } from "@/lib/scaling";

const walletTypeOptions = Object.keys(walletTypes).map((key) => ({
  label: walletTypes[key as keyof typeof walletTypes],
  value: key,
}));

type WalletFormState = typeof WalletTable.$inferInsert;
type WalletErrorsState = Record<keyof WalletFormState, string>;
type WalletFormStatus = "success" | "pending" | "error" | "idle";

export default function CreateWallet() {
  const [formState, setFormState] = useState<Partial<WalletFormState>>({});
  const [errors, setErrors] = useState<Partial<WalletErrorsState>>({});
  const [status, setStatus] = useState<WalletFormStatus>("idle");

  const handleChange = (name: keyof typeof formState) => (value?: unknown) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && { financialEntityId: undefined }),
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    const { balance = 0, name, type, financialEntityId } = formState;
    const newErrors: Partial<WalletErrorsState> = {};

    if (status === "pending" || status === "success") {
      return;
    }

    if (!name || !name.trim().length) {
      newErrors.name = "Ingresa un nombre";
    }
    if (!type || typeof walletTypes[type] !== "string") {
      newErrors.type = "Selecciona un tipo";
    }
    if (!financialEntityId) {
      newErrors.financialEntityId = "Selecciona un banco o entidad financiera.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("pending");

    const payload: WalletFormState = {
      name: name?.trim(),
      totalIncome: balance,
      financialEntityId: financialEntityId ?? null,
      balance,
      type,
    };

    try {
      await db.insert(WalletTable).values(payload);
      setStatus("success");

      Alert.alert("Éxito", "Billetera creada correctamente.", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    } catch {
      setStatus("error");
      Alert.alert(
        "Error",
        "Hubo un problema al crear la billetera. Inténtalo de nuevo.",
      );
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingVertical: verticalScale(14),
            paddingHorizontal: verticalScale(14),
            gap: scale(20),
          }}
        >
          <View style={{ justifyContent: "flex-start" }}>
            <Button
              variant="secondary"
              style={{ width: scale(45), height: scale(45) }}
              onPress={() => router.back()}
            >
              <Feather
                name="arrow-left"
                size={scale(20)}
                color={colors.white}
              />
            </Button>
          </View>
          <View
            style={{ alignItems: "flex-start", paddingTop: verticalScale(15) }}
          >
            <Text size={34} fontWeight={600}>
              Crear
            </Text>
            <Text
              size={34}
              fontWeight={600}
              style={{ lineHeight: verticalScale(35) }}
            >
              Una Billetera
            </Text>
          </View>
          <View style={{ gap: verticalScale(4) }}>
            <Text color={colors.grayLight} size={13}>
              ¿Cuál es el tipo de tu billetera?
            </Text>
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
          {(formState.type === undefined || formState.type !== "other") && (
            <View style={{ gap: verticalScale(4) }}>
              <Text color={colors.grayLight} size={13}>
                ¿Cuál es tu banco o entidad financiera?
              </Text>
              <FinancialEntityPicker
                walletType={formState.type}
                value={formState.financialEntityId}
                onChange={handleChange("financialEntityId")}
              />
              {errors.financialEntityId && (
                <Text size={12} color={colors.red}>
                  {errors.financialEntityId}
                </Text>
              )}
            </View>
          )}
          <Button
            onPress={handleSubmit}
            disabled={status === "pending" || status === "success"}
          >
            <Text color={colors.black} size={14} fontWeight={600}>
              Crear
            </Text>
          </Button>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
