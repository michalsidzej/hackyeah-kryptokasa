import { z } from "zod";

export interface NbpPrice {
  price: number;
  date: Date;
}

const NbpResponse = z.object({
  rates: z.array(
    z.object({
      effectiveDate: z.string(),
      mid: z.number(),
    })
  ),
});

const API_URL = "https://api.nbp.pl";

class NbpClient {
  async getTodayPrice(currency: string): Promise<NbpPrice> {
    const url = `${API_URL}/api/exchangerates/rates/a/${currency}?format=json`;
    const result = await window.api.fetch(url);
    const data = NbpResponse.parse(result);

    return {
      price: data.rates[0].mid,
      date: new Date(data.rates[0].effectiveDate),
    };
  }
}

export const nbpClient = new NbpClient();
