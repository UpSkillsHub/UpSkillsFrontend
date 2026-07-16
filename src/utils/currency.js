// Prices are stored in the backend as a single value; we treat that as USD and
// show the Rwandan franc (RWF) equivalent. The live daily rate comes from the
// backend (/api/currency); this constant is only a fallback before it loads.
export const DEFAULT_USD_TO_RWF = 1470;

export function formatUSD(amount) {
  const n = Number(amount) || 0;
  return `$${n.toFixed(2)}`;
}

export function formatRWF(amountUsd, rate = DEFAULT_USD_TO_RWF) {
  const n = Math.round((Number(amountUsd) || 0) * rate);
  return `${n.toLocaleString("en-US")} RWF`;
}

// "Free" when 0, otherwise "$49.99 · 73,500 RWF"
export function formatPrice(amountUsd, rate = DEFAULT_USD_TO_RWF) {
  const n = Number(amountUsd) || 0;
  if (n === 0) return "Free";
  return `${formatUSD(n)} · ${formatRWF(n, rate)}`;
}
