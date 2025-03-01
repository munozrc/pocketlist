export function formatCurrency(
  value: number | string = "",
  options?: {
    locale?: string;
    currency?: string;
    style?: keyof Intl.NumberFormatOptionsStyleRegistry;
  }
): string {
  const {
    locale = "es-CO",
    currency = "COP",
    style = "currency",
  } = options || {};

  const formatter = new Intl.NumberFormat(locale, {
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style,
  });

  if (typeof value !== "number" || isNaN(Number(value))) {
    return formatter.format(0);
  }

  return formatter.format(value);
}
