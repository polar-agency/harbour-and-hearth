// Brand rule: prices always show as GBP with two decimals, e.g. 3.2 -> "£3.20".
export function formatPrice(gbp: number): string {
  return `£${gbp.toFixed(2)}`;
}
