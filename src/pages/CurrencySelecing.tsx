import { useState } from "react";
import { useDownloader } from "../downloader/useDownloader";
import { CurrencyForm, CurrencyRecord } from "../components/CurrencyForm";
import { CurrencyTable } from "../components/CurrencyTable";

export function CurrencySelector() {
  const [selectedCurrencies, setSelectedCurrencies] = useState<
    CurrencyRecord[]
  >([]);

  const data = useDownloader(selectedCurrencies);

  return (
    <>
      <CurrencyForm
        onSubmit={(currencyRecord) =>
          setSelectedCurrencies([...selectedCurrencies, currencyRecord])
        }
      />
      <CurrencyTable data={data} />
    </>
  );
}
