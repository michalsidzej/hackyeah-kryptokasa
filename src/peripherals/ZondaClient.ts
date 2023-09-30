import { z } from "zod";
import { PriceRecord } from "./types";

const ZondaApiSchema = z.object({
  status: z.literal("Ok"),
  ticker: z.object({
    time: z.string(),
    highestBid: z.string(),
    lowestAsk: z.string(),
  }),
});

export class ZondaClient {
  constructor(private readonly url: string) {}

  async getPrice(
    baseCurrency: string,
    quoteCurrency: string
  ): Promise<PriceRecord> {
    const response = await fetch(
      `${this.url}/rest/trading/ticker/${baseCurrency}-${quoteCurrency}`
    );
    const result = await response.json();
    const data = ZondaApiSchema.parse(result);

    const avgPrice =
      (Number(data.ticker.highestBid) + Number(data.ticker.lowestAsk)) / 2;
    return { price: avgPrice, time: data.ticker.time, provider: "zonda" };
  }
}
