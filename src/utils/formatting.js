export function formatPriceGBP(value) {
  const number = Number(value);
  return isNaN(number)
    ? '£0.00'
    : `£${number.toFixed(2)}`;
}
