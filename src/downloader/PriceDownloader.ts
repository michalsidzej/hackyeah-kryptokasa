import { KrakenClient } from "../peripherals/KrakenClient";
import { PriceProvider, PriceRecord } from "../peripherals/types";
import { ZondaClient } from "../peripherals/ZondaClient";

class PriceDownloader {
  constructor(private readonly priceProviders: PriceProvider[]) {}

  async getPrices(
    baseCurrency: string,
    quoteCurrency: string
  ): Promise<PriceRecord[]> {
    return await Promise.all(
      this.priceProviders.map((provider) =>
        provider.getPrice(baseCurrency, quoteCurrency)
      )
    );
  }
}

export const priceDownloader = new PriceDownloader([
  new ZondaClient("https://api.zonda.exchange"),
  new KrakenClient("https://api.kraken.com"),
]);
