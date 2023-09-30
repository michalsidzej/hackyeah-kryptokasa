import { useEffect, useState } from "react";
import { priceDownloader } from "./PriceDownloader";
import { PriceRecord } from "../peripherals/types";

export function usePriceDownloader(baseCurrency: string) {
  const quoteCurrency = "USD";
  const [prices, setPrices] = useState<PriceRecord[]>([]);

  async function fetchPrices(baseCurrency: string, quoteCurrency: string) {
    const price = await priceDownloader.getPrices(baseCurrency, quoteCurrency);
    setPrices([...prices, ...price]);
  }

  useEffect(() => {
    fetchPrices(baseCurrency, quoteCurrency);
  }, []);

  return prices;
}
