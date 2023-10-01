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
        onChange={(value: string) =>
          setFormState({ ...formState, currencySymbol: value })
        }
      />
      <Label text="Ilość aktywu" />
      <Input
        type="number"
        value={formState.amount}
        onChange={handleInputChange}
        name="amount"
        className="mb-3"
      />
      <div className="flex gap-3">
        <Button text="Wróć" onClick={() => navigate("/")} />
        <Button text="Dodaj" type="submit" blue />
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
    const name = /\(([^)]+)\)/.exec(formState.nameAndSymbol)?.[1];
    const symbol = /^.*?\(/.exec(formState.nameAndSymbol)?.[1];

    const avgPrice = formState.prices.reduce(
      (acc, curr) => acc + curr.price,
      0
    );

    const assetData: AssetData = {
      name: name,
      symbol: symbol,
      avgPrice,
      value: avgPrice * formState.amount,
      amount: formState.amount,
      prices: formState.prices.map((price) => ({
        provider: price.providerName,
        price: price.price,
        amount: formState.amount,
        value: price.price * formState.amount,
        providerUrl: price.providerUrl,
      })),
    };
    props.onSubmit(assetData);
  }
  return (
    <form className="flex flex-col gap-2 mt-3" onSubmit={handleSubmit}>
      <Label text="Nazwa i ID aktywu" />
      <Input
        placeholder="np. Bitcoin (BTC)"
        value={formState.nameAndSymbol}
        onChange={handleInputChange}
        name="name"
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
        return (
          <React.Fragment key={i}>
            <Label text="Nazwa giełdy" />
            <Input
              value={formState.prices[i].providerName}
              onChange={handleInputChange}
              name={`providerName[${i}]`}
              className="mb-3"
            />
            <Label text="Adres giełdy" />
            <Input
              value={formState.prices[i].providerUrl}
              onChange={handleInputChange}
              name={`providerUrl[${i}]`}
              className="mb-3"
            />
            <Label text="Cena" />
            <Input
              type="number"
              value={formState.prices[i].price}
              onChange={handleInputChange}
              name={`price[${i}]`}
              className="mb-3"
            />
          </React.Fragment>
        );
      })}
      <Button
        text="Dodaj kurs"
        onClick={() => setPricesLength(pricesLength + 1)}
        className="mb-3"
      />
      <div className="flex gap-3">
        <Button text="Wróć" onClick={() => navigate("/")} />
        <Button text="Dodaj" type="submit" blue />
      </div>
    </form>
  );
}
