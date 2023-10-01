import { z } from "zod";

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
  async getTodayPrice(currency: string) {
    const url = `${API_URL}/api/exchangerates/rates/a/${currency}?format=json`;
    const result = await window.api.fetch(url);
    const data = NbpResponse.parse(result);
    return data.rates[0].mid;
  }
}

export const nbpClient = new NbpClient();
