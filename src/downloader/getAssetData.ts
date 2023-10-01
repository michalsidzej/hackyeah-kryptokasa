import { AssetData } from "../components/CurrencyTable";
import { priceDownloader } from "./PriceDownloader";

const quoteCurrency = "USD";

export async function getAssetData(
  currencySymbol: string,
  currencyName: string,
  amount: number
): Promise<AssetData> {
  const prices = await priceDownloader.getPrices(currencySymbol, quoteCurrency);
  const avgPrice =
    prices.reduce((acc, price) => acc + Number(price.price), 0) / prices.length;

  return {
    name: currencyName,
    symbol: currencySymbol,
    amount: Number(amount),
    avgPrice,
    value: avgPrice * amount,
    prices: prices.map((price) => ({
      name: price.name,
      url: price.url,
      price: Number(price.price),
    })),
  };
}
