import { AssetData } from "../components/CurrencyTable";
import { currenciesConfig } from "../config";
import { priceDownloader } from "./PriceDownloader";

const quoteCurrency = "USD";

export async function getAssetData(
  currencySymbol: string,
  amount: number
): Promise<AssetData> {
  const prices = await priceDownloader.getPrices(currencySymbol, quoteCurrency);
  const currencyConfig = currenciesConfig.find(
    (currency) => currency.symbol === currencySymbol
  );
  if (!currencyConfig) {
    throw new Error(`Currency ${currencySymbol} not found in config`);
  }
  const avgPrice =
    prices.reduce((acc, price) => acc + price.price, 0) / prices.length;

  return {
    name: currencyConfig.name,
    symbol: currencyConfig.symbol,
    amount,
    avgPrice,
    value: avgPrice * amount,
    prices: prices.map((price) => ({
      provider: price.provider,
      price: price.price,
      value: price.price * amount,
      amount,
    })),
  };
}
