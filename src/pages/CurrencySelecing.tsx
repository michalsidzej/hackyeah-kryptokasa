import { useContext, useEffect, useState } from "react";
import { CurrencyForm, CurrencyRecord } from "../components/CurrencyForm";
import { AssetTable } from "../components/CurrencyTable";
import { Button } from "../components/Button";
import { AssetDataContext } from "../App";
import { getAssetData } from "../downloader/getAssetData";

export function CurrencySelector() {
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyRecord>(null);

  const { assetData, setAssetData } = useContext(AssetDataContext);

  useEffect(() => {
    async function fetchData(record: CurrencyRecord) {
      const data = await getAssetData(record.currencySymbol, record.amount);
      setAssetData([...(assetData ?? []), data]);
    }

    if (selectedCurrency) {
      fetchData(selectedCurrency);
    }
  }, [selectedCurrency]);

  return (
    <div className="flex h-full">
      <CurrencyForm
        onSubmit={(currencyRecord) => setSelectedCurrency(currencyRecord)}
      />
      <div className="px-8 flex flex-col">
        <div className="grow">
          <AssetTable data={assetData ?? []} />
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
