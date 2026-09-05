export const PRICE_UNAVAILABLE_LABEL = 'данные отсутствуют';

export function hasPrice(price: number | null | undefined): price is number {
  return typeof price === 'number' && price > 0;
}

export function formatPrice(
  price: number | null | undefined,
  options?: { suffix?: string }
): string {
  if (!hasPrice(price)) {
    return PRICE_UNAVAILABLE_LABEL;
  }

  const formatted = price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return options?.suffix ? `${formatted}${options.suffix}` : formatted;
}
