import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { CurrencySelect } from "./CurrencySelect";
import { useNavigate } from "react-router-dom";
import { Label } from "./Label";
import { Input } from "./Input";
import { Tabs } from "./Tabs";
import { AssetData } from "./CurrencyTable";

export interface CurrencyRecord {
  currencySymbol: string;
  currencyName: string;
  amount: number;
}

interface CurrencyFormProps {
  onSubmit: (currencyRecord: CurrencyRecord) => void;
  onManualSubmit: (assetData: AssetData) => void;
}

export function CurrencyForm(props: CurrencyFormProps) {
  return (
    <section className="w-[500px]">
      <h2 className="mb-3 text-xxl">Wyszukaj kryptowalutę</h2>
      <p className="mb-3">
        System automatycznie znajdzie dzisiejszą cenę aktywów. Możesz też
        wprowadzić dane manualnie.
      </p>
      <Tabs
        tabs={[
          {
            title: "Automatycznie",
            panel: <AutoAssetForm onSubmit={props.onSubmit} />,
          },
          {
            title: "Manualnie",
            panel: <ManualAssetForm onSubmit={props.onManualSubmit} />,
          },
        ]}
      />
    </section>
  );
}

interface AutoAssetFormProps {
  onSubmit: (currencyRecord: CurrencyRecord) => void;
}

function AutoAssetForm(props: AutoAssetFormProps) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<CurrencyRecord>({
    amount: 0,
    currencySymbol: "",
    currencyName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onSubmit(formState);
  }
  return (
    <form className="flex flex-col gap-2 mt-3" onSubmit={handleSubmit}>
      <CurrencySelect
        className="mb-2"
        onChange={(value: string) => {
          const symbol = /\(([^)]+)\)/.exec(value)?.[1];
          const name = /^(.*?)\s*(?=\()/.exec(value)?.[1];
          setFormState({
            ...formState,
            currencySymbol: symbol,
            currencyName: name,
          });
        }}
      />
      <Label text="Ilość aktywu" />
      <Input
        type="number"
        value={formState.amount}
        onChange={handleInputChange}
        name="amount"
        className="mb-3"
      />
      <div className="flex gap-3 flex-row-reverse	">
        <Button text="Dodaj" type="submit" blue />
        <Button text="Wróć" onClick={() => navigate("/")} />
      </div>
    </form>
  );
}

interface ManualAssetData {
  nameAndSymbol: string;
  amount: number;
  prices: {
    providerName: string;
    providerUrl: string;
    price: number;
  }[];
}

interface ManualAssetFormProps {
  onSubmit: (assetData: AssetData) => void;
}

function ManualAssetForm(props: ManualAssetFormProps) {
  const navigate = useNavigate();
  const [pricesLength, setPricesLength] = useState<number>(0);

  const defaultFormState: ManualAssetData = {
    nameAndSymbol: "",
    amount: 0,
    prices: [],
  };

  const [formState, setFormState] = useState<ManualAssetData>({
    nameAndSymbol: "",
    amount: 0,
    prices: [],
  });

  useEffect(() => {
    setFormState({
      ...formState,
      prices: formState.prices.concat({
        providerName: "",
        price: 0,
        providerUrl: "",
      }),
    });
  }, [pricesLength]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const symbol = /\(([^)]+)\)/.exec(formState.nameAndSymbol)?.[1];
    const name = /^(.*?)\s*(?=\()/.exec(formState.nameAndSymbol)?.[1];

    const avgPrice = formState.prices.reduce(
      (acc, curr) => acc + Number(curr.price),
      0
    );

    const assetData: AssetData = {
      name: name,
      symbol: symbol,
      avgPrice,
      value: avgPrice * formState.amount,
      amount: Number(formState.amount),
      prices: formState.prices
        .filter((price) => price.price !== 0)
        .map((price) => ({
          name: price.providerName,
          price: Number(price.price),
          url: price.providerUrl,
          date: new Date(),
        })),
    };

    props.onSubmit(assetData);
    setFormState(defaultFormState);
    setPricesLength(0);
  }
  return (
    <form className="flex flex-col gap-2 mt-3" onSubmit={handleSubmit}>
      <Label text="Nazwa i ID aktywu" />
      <Input
        placeholder="np. Bitcoin (BTC)"
        value={formState.nameAndSymbol}
        onChange={handleInputChange}
        name="nameAndSymbol"
        className="mb-3"
      />
      <Label text="Ilość aktywu" />
      <Input
        type="number"
        value={formState.amount}
        onChange={handleInputChange}
        name="amount"
        className="mb-3"
      />
      {Array.from({ length: pricesLength }).map((_, i) => {
        function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
          const { name, value } = e.target;
          setFormState({
            ...formState,
            prices: formState.prices.map((price, index) => {
              if (index === i) {
                return {
                  ...price,
                  [name]: value,
                };
              }
              return price;
            }),
          });
        }

        return (
          <React.Fragment key={i}>
            <Label text="Nazwa giełdy" />
            <Input
              value={formState.prices[i].providerName}
              onChange={handlePriceChange}
              name="providerName"
              className="mb-3"
            />
            <Label text="Adres giełdy" />
            <Input
              value={formState.prices[i].providerUrl}
              onChange={handlePriceChange}
              name="providerUrl"
              className="mb-3"
            />
            <Label text="Cena" />
            <Input
              type="number"
              value={formState.prices[i].price}
              onChange={handlePriceChange}
              name="price"
              className="mb-3"
            />
          </React.Fragment>
        );
      })}
      <Button
        text="Dodaj kurs"
        onClick={() => setPricesLength(pricesLength + 1)}
        className="mb-3"
        preventDefault
      />
      <div className="flex gap-3 flex-row-reverse	">
        <Button text="Dodaj" type="submit" blue />
        <Button text="Wróć" onClick={() => navigate("/")} />
      </div>
    </form>
  );
}
