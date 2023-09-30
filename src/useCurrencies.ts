import { currenciesConfig } from "./config";
import { usePriceDownloader } from "./downloader/usePriceDownloader";

export function useCurrencies(baseCurrencies: string[]) {
  const result = [];
  for (const baseCurrency of baseCurrencies) {
    const prices = usePriceDownloader(baseCurrency);
    const currencyConfig = currenciesConfig.find(
      (currency) => currency.symbol === baseCurrency
    );
    if (!currencyConfig) {
      throw new Error(`Currency ${baseCurrency} not found in config`);
    }
    result.push({ baseCurrency, prices });
  }

  return result;
}
