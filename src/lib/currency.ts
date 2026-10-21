export interface Currency {
  code: string;
  symbol: string;
  rate: number;
}

export const SUPPORTED_CURRENCIES: Record<string, Currency> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  USDT: { code: 'USDT', symbol: 'USDT', rate: 1.0 },
  BTC: { code: 'BTC', symbol: '₿', rate: 0.000015 },
  KES: { code: 'KES', symbol: 'KSh', rate: 129.5 },
  ZAR: { code: 'ZAR', symbol: 'R', rate: 17.8 }
};

export function convertAmount(amountInUSD: number, targetCurrency: string = 'USD'): string {
  const curr = SUPPORTED_CURRENCIES[targetCurrency] || SUPPORTED_CURRENCIES.USD;
  const converted = amountInUSD * curr.rate;
  if (targetCurrency === 'BTC') {
    return `${curr.symbol} ${converted.toFixed(6)}`;
  }
  return `${curr.symbol} ${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
