import { ZondaClient } from "../peripherals/ZondaClient";

export interface Prices {
  zonda: number;
}

class PriceDownloader {
  constructor(private readonly ZondaClient: ZondaClient) {}

  async getPrices(
    baseCurrency: string,
    quoteCurrency: string
  ): Promise<Prices> {
    const price = await this.ZondaClient.getPrice(baseCurrency, quoteCurrency);
    return {
      zonda: price,
    };
  }
}

export const priceDownloader = new PriceDownloader(
  new ZondaClient("https://api.zonda.exchange")
);
