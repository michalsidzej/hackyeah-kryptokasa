import { CoinbaseClient } from "../peripherals/CoinbaseClient";
import { KrakenClient } from "../peripherals/KrakenClient";
import { PriceProvider, ValueRecord } from "../peripherals/types";
import { ZondaClient } from "../peripherals/ZondaClient";

class PriceDownloader {
  constructor(private readonly priceProviders: PriceProvider[]) {}

  async getPrices(
    baseCurrency: string,
    quoteCurrency: string
  ): Promise<ValueRecord[]> {
    const prices = await Promise.all(
      this.priceProviders.flatMap(async (provider) => {
        try {
          return await provider.getPrice(baseCurrency, quoteCurrency);
        } catch (error) {
          console.error(error);
          return;
        }
      })
    );

    return prices.filter((price) => price !== undefined) as ValueRecord[];
  }
}

export const priceDownloader = new PriceDownloader([
  new ZondaClient("https://api.zonda.exchange"),
  new KrakenClient("https://api.kraken.com"),
  new CoinbaseClient(),
]);
