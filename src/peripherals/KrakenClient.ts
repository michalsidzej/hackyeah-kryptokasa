import { z } from "zod";
import { PriceProvider, PriceRecord } from "./types";

const oneKeySchema = z.custom(
  (value) => {
    const keys = Object.keys(value);
    if (keys.length !== 1) {
      return false; // Must have exactly one key
    }

    const key = keys[0];
    if (typeof key !== "string" || key === "") {
      return false; // Key must be a non-empty string
    }

    return true; // Valid
  },
  { message: "Object must have a single key that is a non-empty string" }
);

const KrakenApiSchema = z.object({
  error: z.tuple([]),
  result: oneKeySchema,
});

export class KrakenClient implements PriceProvider {
  constructor(private readonly url: string) {}

  async getPrice(
    baseCurrency: string,
    quoteCurrency: string
  ): Promise<PriceRecord> {
    const response = await window.api.fetch(
      `${this.url}/0/public/Ticker/?pair=${baseCurrency}${quoteCurrency}`
    );
    const data = KrakenApiSchema.parse(response);
    const time = new Date();
    const result = Object.values(data.result)[0];
    const price = Number(result.a[0]);

    return { price, time, provider: "kraken" };
  }
}
