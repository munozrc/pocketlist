export function formatCurrency(
  value: number | string = "",
  options?: { locale?: string; currency?: string }
): string {
  const { locale = "es-CO", currency = "COP" } = options || {};

  const formatter = new Intl.NumberFormat(locale, {
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: "currency",
  });

  if (typeof value !== "number" || isNaN(Number(value))) {
    return formatter.format(0);
  }

  return formatter.format(value);
}
