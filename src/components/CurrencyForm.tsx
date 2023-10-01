import { useState } from "react";
import { Button } from "./Button";
import { CurrencySelect } from "./CurrencySelect";
import { useNavigate } from "react-router-dom";
import { Label } from "./Label";
import { Input } from "./Input";

export interface CurrencyRecord {
  currencySymbol: string;
  amount: number;
}

interface CurrencyFormProps {
  onSubmit: (currencyRecord: CurrencyRecord) => void;
}

export function CurrencyForm(props: CurrencyFormProps) {
  return (
    <section className="w-[500px]">
      <h2 className="mb-3 text-xxl">Wyszukaj kryptowalutę</h2>
      <p className="mb-10">
        System automatycznie znajdzie dzisiejszą cenę aktywów. Możesz też
        wprowadzić dane manualnie.
      </p>
      <AutoAssetForm onSubmit={props.onSubmit} />
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
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
