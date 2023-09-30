import { CurrencyRecord } from "../components/CurrencyForm";
import { CurrencyData } from "../components/CurrencyTable";
import { currenciesConfig } from "../config";
import { priceDownloader } from "./PriceDownloader";

const quoteCurrency = "USD";

export async function downloadCurrencies(
  currencies: CurrencyRecord[]
): Promise<CurrencyData[]> {
  const result: CurrencyData[] = [];
  for (const { currencySymbol, amount } of currencies) {
    console.log(`Downloading ${currencySymbol}...`);
    const prices = await priceDownloader.getPrices(
      currencySymbol,
      quoteCurrency
    );
    const currencyConfig = currenciesConfig.find(
      (currency) => currency.symbol === currencySymbol
    );
    if (!currencyConfig) {
      throw new Error(`Currency ${currencySymbol} not found in config`);
    }
    const avgPrice =
      prices.reduce((acc, price) => acc + price.price, 0) / prices.length;

    result.push({
      name: `${currencyConfig.name} (${currencyConfig.symbol})`,
      amount,
      avgPrice,
      prices: prices.map((price) => ({
        provider: price.provider,
        price: price.price,
        value: price.price * amount,
        amount,
      })),
    });
  }

  return result;
}
