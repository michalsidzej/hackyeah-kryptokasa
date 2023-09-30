interface CurrencySchema {
  name: string;
  symbol: string;
}

export const currenciesConfig: CurrencySchema[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
  },
  {
    name: "Tether",
    symbol: "USDT",
  },
];
