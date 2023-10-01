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
  {
    name: "XRP",
    symbol: "XRP",
  },
  {
    name: "USD Coin",
    symbol: "USDC",
  },
  {
    name: "BNB",
    symbol: "BNB",
  },
  {
    name: "Lido Staked Ether",
    symbol: "STETH",
  },
  {
    name: "Solana",
    symbol: "SOL",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
  },
  {
    name: "Cardano",
    symbol: "ADA",
  },
];
