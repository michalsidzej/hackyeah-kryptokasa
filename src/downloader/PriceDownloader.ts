import { KrakenClient } from "../peripherals/KrakenClient";
import { PriceRecord } from "../peripherals/types";
import { ZondaClient } from "../peripherals/ZondaClient";

class PriceDownloader {
  constructor(
    private readonly zondaClient: ZondaClient,
    private readonly krakenClient: KrakenClient
  ) {}

  async getPrices(
    baseCurrency: string,
    quoteCurrency: string
  ): Promise<PriceRecord[]> {
    const zondaPrice = await this.zondaClient.getPrice(
      baseCurrency,
      quoteCurrency
    );
    const krakenPrice = await this.krakenClient.getPrice(
      baseCurrency,
      quoteCurrency
    );

    return [zondaPrice, krakenPrice];
  }
}

export const priceDownloader = new PriceDownloader(
  new ZondaClient("https://api.zonda.exchange"),
  new KrakenClient("https://api.kraken.com")
);
