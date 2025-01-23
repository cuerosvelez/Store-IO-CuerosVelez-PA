import { useCallback } from 'react';
import { useRuntime } from 'vtex.render-runtime';

export default function useFormatPrice() {
  const { culture } = useRuntime();

  const formatPrice = useCallback(
    (price: number | string) => {
      return new Intl.NumberFormat(culture.locale, {
        currency: culture.currency,
        style: 'currency',
        minimumFractionDigits: 0,
      }).format(Number(price));
    },
    [culture.currency, culture.locale],
  );

  return { formatPrice };
}
