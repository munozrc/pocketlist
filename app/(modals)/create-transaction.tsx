import { eq } from "drizzle-orm";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import { ScreenWrapper } from "@/components/layouts";
import { Button, DatePicker, Input, Select, Text } from "@/components/ui";
import { colors } from "@/constants/theme";
import { db } from "@/database/init";
import { TransactionTable, WalletTable } from "@/database/schema";
import { transactionTypes } from "@/features/transaction/constants";
import { useTransactionCategories } from "@/features/transaction/hooks";
import { useWallets } from "@/features/wallet/hooks";
import { formatCurrency } from "@/lib/formatters";
import { scale, verticalScale } from "@/lib/scaling";

const transactionTypeOptions = Object.keys(transactionTypes).map((key) => ({
  label: transactionTypes[key as keyof typeof transactionTypes],
  value: key,
}));

type TransactionFormState = typeof TransactionTable.$inferInsert;
type TransactionErrorsState = Record<keyof TransactionFormState, string>;
type TransactionFormStatus = "success" | "pending" | "error" | "idle";

export default function CreateTransaction() {
  const [formState, setFormState] = useState<Partial<TransactionFormState>>({});
  const [errors, setErrors] = useState<Partial<TransactionErrorsState>>({});
  const [status, setStatus] = useState<TransactionFormStatus>("idle");

  const { wallets: walletList } = useWallets();
  const { categories } = useTransactionCategories({ type: formState.type });

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({
      label: category.name,
      value: category.id,
    }));
  }, [categories]);

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
      newErrors.category = "Selecciona un tipo";
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
        { text: "OK", onPress: () => router.replace("/") },
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
          <Text size={25} fontWeight="700">
            Crear Transacción
          </Text>
          <View>
            <Select
              value={formState.type}
              options={transactionTypeOptions}
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
          <View>
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
            <Select
              value={formState.category}
              options={categoryOptions}
              defaultOptionText="Selecciona una categoría"
              onChange={handleChange("category")}
              isError={!!errors.category}
            />
            {errors.category && (
              <Text size={12} color={colors.red}>
                {errors.category}
              </Text>
            )}
          </View>
          <View>
            <Input
              value={formState.title}
              placeholder="Titulo"
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
            <Input
              value={formState.description}
              placeholder="Descripción (opcional)"
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
            <Input
              value={formState.amount}
              placeholder="Valor"
              onChangeNumber={handleChange("amount")}
              isError={!!errors.amount}
            />
            {errors.amount && (
              <Text size={12} color={colors.red}>
                {errors.amount}
              </Text>
            )}
          </View>
          <View>
            <DatePicker
              value={formState.createdAt}
              onChangeDate={handleChange("createdAt")}
              isError={!!errors.createdAt}
            />
          </View>
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
