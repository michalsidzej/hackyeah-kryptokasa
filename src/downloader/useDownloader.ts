import { useEffect, useState } from "react";
import { CurrencyData } from "../components/CurrencyTable";
import { downloadCurrencies } from "./downloadCurrencies";
import { CurrencyRecord } from "../components/CurrencyForm";

export function useDownloader(currencies: CurrencyRecord[]) {
  const [data, setData] = useState<CurrencyData[]>([]);

  useEffect(() => {
    async function getData() {
      const data = await downloadCurrencies(currencies);
      setData(data);
    }

    getData();
  }, [currencies]);

  return data;
}
