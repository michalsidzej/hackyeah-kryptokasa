import { PriceRecord } from "../peripherals/types";
import { ZondaClient } from "../peripherals/ZondaClient";

class PriceDownloader {
  constructor(private readonly ZondaClient: ZondaClient) {}

  async getPrices(
    baseCurrency: string,
    quoteCurrency: string
  ): Promise<PriceRecord[]> {
    const price = await this.ZondaClient.getPrice(baseCurrency, quoteCurrency);
    return [price];
  }
}

export const priceDownloader = new PriceDownloader(
  new ZondaClient("https://api.zonda.exchange")
);
