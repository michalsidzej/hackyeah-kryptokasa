import { useState } from "react";
import { useDownloader } from "../downloader/useDownloader";
import { CurrencyForm, CurrencyRecord } from "../components/CurrencyForm";
import { CurrencyTable } from "../components/CurrencyTable";
import { Button } from "../components/Button";

export function CurrencySelector() {
  const [selectedCurrencies, setSelectedCurrencies] = useState<
    CurrencyRecord[]
  >([]);

  const data = useDownloader(selectedCurrencies);

  return (
    <div className="flex h-full">
      <CurrencyForm
        onSubmit={(currencyRecord) =>
          setSelectedCurrencies([...selectedCurrencies, currencyRecord])
        }
      />
      <div className="px-8 flex flex-col">
        <div className="grow">
          <CurrencyTable data={data} />
        </div>

        <hr className="border-gray-100 mb-4" />
        <div className="flex justify-end">
          <Button
            text="Generuj&nbsp;raport"
            blue
            onClick={() => alert("TODO")}
          />
        </div>
      </div>
    </div>
  );
}
