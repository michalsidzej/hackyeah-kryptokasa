interface CurrencySchema {
  name: string;
  symbol: string;
  krakenSymbol: string;
}

export const currenciesConfig: CurrencySchema[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    krakenSymbol: "XXBT",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    krakenSymbol: "XETH",
  },
  {
    name: "Tether",
    symbol: "USDT",
    krakenSymbol: "USDT",
  },
];
