import { useState } from "react";
import { Button } from "./Button";
import { CurrencyAmountInput } from "./CurrencyAmountInput";
import { CurrencySelect } from "./CurrencySelect";

export interface CurrencyRecord {
  currencySymbol: string;
  amount: number;
}

interface CurrencyFormProps {
  onSubmit: (currencyRecord: CurrencyRecord) => void;
}

export function CurrencyForm(props: CurrencyFormProps) {
  const [currency, setCurrency] = useState<string>();
  const [amount, setAmount] = useState<number>();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({
      currency: currency,
      amount: amount,
    });
    props.onSubmit({
      currencySymbol: currency,
      amount: amount,
    });
  }
  return (
    <section className="min-w-[500px]">
      <h2 className="mb-3 text-xxl">Wyszukaj kryptowalutę</h2>
      <p className="mb-10">
        System automatycznie znajdzie dzisiejszą cenę aktywów. Możesz też
        wprowadzić dane manualnie.
      </p>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <CurrencySelect className="mb-2" onChange={setCurrency} />
        <CurrencyAmountInput
          className="mb-3"
          onChange={setAmount}
          value={amount}
        />
        <div className="flex gap-3">
          <Button text="Usuń" />
          <Button text="Dodaj" type="submit" blue />
        </div>
      </form>
    </section>
  );
}
