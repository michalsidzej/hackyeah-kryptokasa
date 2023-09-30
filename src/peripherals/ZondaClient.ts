import { z } from "zod";
import { PriceProvider, PriceRecord } from "./types";

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
  ): Promise<PriceRecord> {
    const response = await window.api.fetch(
      `${this.url}/rest/trading/ticker/${baseCurrency}-${quoteCurrency}`
    );
    const data = ZondaApiSchema.parse(response);

    const avgPrice =
      (Number(data.ticker.highestBid) + Number(data.ticker.lowestAsk)) / 2;
    return {
      price: avgPrice,
      time: new Date(data.ticker.time),
      provider: "zonda",
    };
  }
}
