import { z } from "zod";
import { PriceProvider, ValueRecord } from "./types";

const CoinbaseApiSchema = z.object({
  data: z.object({ amount: z.string() }),
});

export class CoinbaseClient implements PriceProvider {
  private readonly url = "https://api.coinbase.com/v2/prices";

  async getPrice(
    baseCurrency: string,
    quoteCurrency: string
  ): Promise<ValueRecord> {
    const response = await window.api.fetch(
      `${this.url}/${baseCurrency}-${quoteCurrency}/buy`
    );
    const data = CoinbaseApiSchema.parse(response);
    const price = Number(data.data.amount);

    return {
      price,
      name: "Coinbase",
      url: "https://www.coinbase.com/",
      date: new Date(),
    };
  }
}
