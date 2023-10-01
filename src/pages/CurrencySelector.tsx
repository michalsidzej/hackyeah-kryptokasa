import { useContext, useEffect, useState } from "react";
import { CurrencyForm, CurrencyRecord } from "../components/CurrencyForm";
import { AssetData, AssetTable } from "../components/CurrencyTable";
import { Button } from "../components/Button";
import { AssetDataContext, CaseDataContext, UsdPriceContext } from "../App";
import { getAssetData } from "../downloader/getAssetData";
import { nbpClient } from "../peripherals/NbpClient";
import { generatePDFReport } from "../report";
import { CaseData } from "./CaseDataPage";

export function CurrencySelector() {
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyRecord>(null);
  const { usdPrice, setUsdPrice } = useContext(UsdPriceContext);
  const { assetData, setAssetData } = useContext(AssetDataContext);
  const { caseData } = useContext<{ caseData: CaseData }>(CaseDataContext);

  useEffect(() => {
    async function fetchUSDPrice() {
      const price = await nbpClient.getTodayPrice("USD");
      setUsdPrice(price);
    }

    fetchUSDPrice();
  }, []);

  useEffect(() => {
    async function fetchData(record: CurrencyRecord) {
      const data = await getAssetData(
        record.currencySymbol,
        record.currencyName,
        record.amount
      );
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
        onManualSubmit={(newAsset) => {
          const relevantAssetData = assetData?.find(
            (saved) =>
              saved.symbol === newAsset.symbol &&
              saved.name === newAsset.name &&
              saved.amount === newAsset.amount
          );
          if (relevantAssetData) {
            setAssetData(
              assetData.map((saved) => {
                console.log(saved, newAsset, saved === newAsset);
                if (
                  saved.symbol === newAsset.symbol &&
                  saved.name === newAsset.name &&
                  saved.amount === newAsset.amount
                ) {
                  const newPrices = saved.prices.concat(newAsset.prices);
                  const newAvgPrice =
                    newPrices.reduce(
                      (prev, current) => prev + Number(current.price),
                      0
                    ) / newPrices.length;

                  console.log(newPrices, newAvgPrice);

                  return {
                    symbol: saved.symbol,
                    name: saved.name,
                    amount: saved.amount,
                    prices: newPrices,
                    avgPrice: newAvgPrice,
                    value: newAvgPrice * saved.amount,
                  } as AssetData;
                }
                return saved;
              })
            );
            return;
          }
          setAssetData([...(assetData ?? []), newAsset]);
        }}
      />
      <div className="pl-8 flex flex-col">
        <div className="grow">
          <div className="text-end mb-1">
            Kurs USD/PLN z dnia {usdPrice?.date.toLocaleDateString()}:{" "}
            <span className="font-bold">{usdPrice?.price}</span>
          </div>
          <AssetTable usdPrice={usdPrice?.price} data={assetData ?? []} />
        </div>

        <hr className="border-gray-100 mb-4" />
        <div className="flex justify-end">
          <Button
            text="Generuj&nbsp;raport"
            blue
            onClick={() => generatePDFReport(caseData, assetData, usdPrice)}
          />
        </div>
      </div>
    </div>
  );
}
