import { Feather } from "@expo/vector-icons";
import { eq } from "drizzle-orm";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import { ScreenWrapper } from "@/components/layouts";
import {
  Button,
  CurrencyInput,
  DatePicker,
  Input,
  Select,
  Text,
} from "@/components/ui";
import { colors } from "@/constants/theme";
import { db } from "@/database/init";
import { TransactionTable, WalletTable } from "@/database/schema";
import {
  TransactionCategoryPicker,
  TransactionTypePicker,
} from "@/features/transactions/components";
import { transactionTypes } from "@/features/transactions/constants";
import { useWallets } from "@/features/wallets/hooks";
import { formatCurrency } from "@/lib/formatters";
import { scale, verticalScale } from "@/lib/scaling";

type TransactionFormState = typeof TransactionTable.$inferInsert;
type TransactionErrorsState = Record<keyof TransactionFormState, string>;
type TransactionFormStatus = "success" | "pending" | "error" | "idle";

export default function CreateTransaction() {
  const [formState, setFormState] = useState<Partial<TransactionFormState>>({
    createdAt: new Date(),
    type: "expense",
  });
  const [errors, setErrors] = useState<Partial<TransactionErrorsState>>({});
  const [status, setStatus] = useState<TransactionFormStatus>("idle");

  const { wallets: walletList } = useWallets();

  const walletOptions = useMemo(() => {
    return walletList.map((wallet) => ({
      label: `${wallet.name} - ${formatCurrency(wallet.balance, {
        currency: wallet.currency ?? "COP",
      })}`,
      value: wallet.id,
    }));
  }, [walletList]);

  const handleChange = (name: keyof typeof formState) => (value?: unknown) => {
    if (
      name === "type" &&
      typeof value === "string" &&
      (value === "income" || value === "expense")
    ) {
      setFormState((prev) => ({ ...prev, type: value, category: undefined }));
      setErrors((prev) => ({ ...prev, type: "", category: "" }));
      return;
    }

    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    const {
      amount,
      category,
      description,
      title,
      type,
      walletId,
      createdAt = new Date(),
    } = formState;

    const newErrors: Partial<TransactionErrorsState> = {};

    if (status === "pending" || status === "success") {
      return;
    }

    if (!title || !title.trim().length) {
      newErrors.title = "Ingresa un titulo";
    }
    if (!amount || isNaN(amount)) {
      newErrors.amount = "Ingresa un valor";
    }
    if (!type || typeof transactionTypes[type] !== "string") {
      newErrors.type = "Selecciona un tipo";
    }
    if (!category || category === 0) {
      newErrors.category = "Selecciona un categoría";
    }
    if (!walletId || walletId === 0) {
      newErrors.walletId = "Selecciona una billetera";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("pending");

    const payload: TransactionFormState = {
      type,
      category,
      createdAt,
      updatedAt: createdAt,
      amount: amount as number,
      description: description?.trim(),
      walletId: walletId as number,
      status: "completed",
      title: title?.trim(),
    };

    try {
      const walletFound = await db.query.WalletTable.findFirst({
        where: (w, { eq }) => eq(w.id, payload.walletId),
      });

      if (!walletFound) {
        Alert.alert("Error", "Billetera no encontrada!", [{ text: "OK" }]);
        setStatus("error");
        return;
      }

      const updateWalletDate = {
        balance:
          type === "income"
            ? walletFound.balance + payload.amount
            : walletFound.balance - payload.amount,
        totalExpenses:
          type === "income"
            ? walletFound.totalExpenses
            : walletFound.totalExpenses + payload.amount,
        totalIncome:
          type === "expense"
            ? walletFound.totalIncome
            : walletFound.totalIncome + payload.amount,
      };

      if (updateWalletDate.balance < 0) {
        Alert.alert("Error", "No tienes dinero suficiente en la billetera", [
          { text: "OK" },
        ]);
        setStatus("error");
        return;
      }

      await db
        .update(WalletTable)
        .set(updateWalletDate)
        .where(eq(WalletTable.id, walletFound.id))
        .execute();

      await db.insert(TransactionTable).values(payload);

      setStatus("success");

      Alert.alert("Éxito", "Transferencia registrada con éxito.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch {
      setStatus("error");
      Alert.alert(
        "Error",
        "Hubo un problema al registrar la transferencia. Inténtalo de nuevo.",
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
          <View>
            <CurrencyInput
              value={formState.amount}
              onChangeNumber={handleChange("amount")}
              placeholder={formatCurrency(0)}
              isError={!!errors.amount}
              containerStyle={{
                justifyContent: "center",
                backgroundColor: colors.black,
                marginBottom: verticalScale(8),
                height: "auto",
              }}
              textStyle={{
                fontSize: verticalScale(33),
              }}
            />
            {errors.amount && (
              <Text size={12} color={colors.red}>
                {errors.amount}
              </Text>
            )}
          </View>
          <View>
            <TransactionTypePicker
              value={formState.type}
              onChange={handleChange("type")}
            />
            {errors.type && (
              <Text size={12} color={colors.red}>
                {errors.type}
              </Text>
            )}
          </View>
          <View>
            <Text
              size={13}
              color={colors.grayLight}
              style={{ marginBottom: verticalScale(4) }}
            >
              Nombre
            </Text>
            <Input
              value={formState.title}
              placeholder="Ingresa un nombre"
              onChangeText={handleChange("title")}
              isError={!!errors.title}
            />
            {errors.title && (
              <Text size={12} color={colors.red}>
                {errors.title}
              </Text>
            )}
          </View>
          <View>
            <Text
              size={13}
              color={colors.grayLight}
              style={{ marginBottom: verticalScale(4) }}
            >
              Billetera
            </Text>
            <Select
              value={formState.walletId}
              options={walletOptions}
              defaultOptionText="Selecciona una billetera"
              onChange={handleChange("walletId")}
              isError={!!errors.walletId}
            />
            {errors.walletId && (
              <Text size={12} color={colors.red}>
                {errors.walletId}
              </Text>
            )}
          </View>
          <View>
            <Text
              size={13}
              color={colors.grayLight}
              style={{ marginBottom: verticalScale(4) }}
            >
              Fecha
            </Text>
            <DatePicker
              value={formState.createdAt}
              onChangeDate={handleChange("createdAt")}
              isError={!!errors.createdAt}
            />
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: verticalScale(4),
                gap: scale(3),
              }}
            >
              <Text color={colors.grayLight} size={13}>
                Descripción
              </Text>
              <Text color={colors.grayDark} size={10}>
                - Opcional
              </Text>
            </View>
            <Input
              value={formState.description}
              placeholder="Ingresa una descripción"
              onChangeText={handleChange("description")}
              isError={!!errors.description}
            />
            {errors.description && (
              <Text size={12} color={colors.red}>
                {errors.description}
              </Text>
            )}
          </View>
          <View>
            <Text
              size={13}
              color={colors.grayLight}
              style={{ marginBottom: verticalScale(8) }}
            >
              Selecciona una categoría.
            </Text>
            <TransactionCategoryPicker
              value={formState.category}
              currentType={formState.type}
              onChange={handleChange("category")}
            />
            {errors.category && (
              <Text size={12} color={colors.red}>
                {errors.category}
              </Text>
            )}
          </View>
          <Button
            onPress={handleSubmit}
            disabled={status === "pending" || status === "success"}
          >
            <Text color={colors.black} size={14} fontWeight={600}>
              Crear Transacción
            </Text>
          </Button>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
