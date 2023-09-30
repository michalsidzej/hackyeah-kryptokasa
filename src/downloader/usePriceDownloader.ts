import { useEffect, useState } from "react";
import { Prices, priceDownloader } from "./PriceDownloader";

export function useDownloader() {
  const baseCurrency = "BTC";
  const quoteCurrency = "USD";
  const [prices, setPrices] = useState<Prices | null>();

  async function fetchPrices(baseCurrency: string, quoteCurrency: string) {
    const price = await priceDownloader.getPrices(baseCurrency, quoteCurrency);
    setPrices((prev: Prices | null) => {
      if (prev === null) return price;
      return { ...prev, ...price };
    });
  }

  useEffect(() => {
    fetchPrices(baseCurrency, quoteCurrency);
  }, []);

  return prices;
}
