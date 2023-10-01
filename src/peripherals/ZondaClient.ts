import { z } from "zod";
import { PriceProvider, ValueRecord } from "./types";

const ZondaApiSchema = z.object({
  status: z.literal("Ok"),
  ticker: z.object({
    time: z.string(),
    highestBid: z.string(),
    lowestAsk: z.string(),
  }),
});

export class ZondaClient implements PriceProvider {
  constructor(private readonly url: string) {}

  async getPrice(
    baseCurrency: string,
    quoteCurrency: string
  ): Promise<ValueRecord> {
    const response = await window.api.fetch(
      `${this.url}/rest/trading/ticker/${baseCurrency}-${quoteCurrency}`
    );
    const data = ZondaApiSchema.parse(response);

    const avgPrice =
      (Number(data.ticker.highestBid) + Number(data.ticker.lowestAsk)) / 2;
    return {
      price: avgPrice,
      name: "zonda",
      url: "https://www.zonda.pl/",
    };
  }
}
