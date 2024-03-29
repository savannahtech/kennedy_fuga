import { useMemo } from "react";
import { siteSettings } from "@settings/site.settings";
import { useSettings } from "@contexts/settings.context";

type PriceProps = {
  amount: number;
  baseAmount?: number;
  currencyCode?: string;
};

export function formatPrice({
  amount,
  currencyCode,
  locale,
}: {
  amount: number;
  currencyCode: string;
  locale: string;
}) {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  });

  return formatCurrency.format(amount);
}

export function formatVariantPrice({
  amount,
  baseAmount,
  currencyCode,
  locale,
}: {
  baseAmount: number;
  amount: number;
  currencyCode: string;
  locale: string;
}) {
  const hasDiscount = baseAmount < amount;
  const formatDiscount = new Intl.NumberFormat(locale, { style: "percent" });
  const discount = hasDiscount
    ? formatDiscount.format((amount - baseAmount) / amount)
    : null;

  const price = formatPrice({ amount, currencyCode, locale });
  const basePrice = hasDiscount
    ? formatPrice({ amount: baseAmount, currencyCode, locale })
    : null;

  return { price, basePrice, discount };
}

export default function usePrice(data?: PriceProps | null) {
  const { options } = useSettings();
  const { amount, baseAmount, currencyCode = options.currency } = data ?? {};
  const locale = siteSettings.defaultLanguage;
  // const value = useMemo(() => {
  if (typeof amount !== "number" || !currencyCode) return { price: '', basePrice: null, discount: null };

  const value = baseAmount
    ? formatVariantPrice({ amount, baseAmount, currencyCode, locale })
    : formatPrice({ amount, currencyCode, locale });
  // }, [amount, baseAmount, currencyCode, locale]);
  return typeof value === "string"
    ? { price: value, basePrice: null, discount: null }
    : value;
}
