import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { currenciesConfig } from "../config";
import { Label } from "./Label";

const currencies = currenciesConfig.map(
  (currency) => `${currency.name} (${currency.symbol})`
);

interface CurrencySelectProps {
  className?: string;
  onChange: (value: string) => void;
}

export function CurrencySelect(props: CurrencySelectProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<string>();
  const [query, setQuery] = useState("");

  const filteredCurrencies =
    query === ""
      ? currencies
      : currencies.filter((currency) => {
          return currency.toLowerCase().includes(query.toLowerCase());
        });

  function onChange(value: string) {
    setSelectedCurrency(value);
    props.onChange(value);
  }

  return (
    <div className={props.className}>
      <Label text="Nazwa lub ID aktywu" />
      <Combobox value={selectedCurrency} onChange={onChange}>
        <div className="relative">
          <Combobox.Input
            name="currency"
            onChange={(event) => setQuery(event.target.value)}
            className="px-3 py-2 border border-gray-100-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
          />
          <Combobox.Options className="absolute bg-white w-full ">
            {query.length > 0 && (
              <Combobox.Option value={query}>{query}</Combobox.Option>
            )}
            {filteredCurrencies.map((currency) => (
              <Combobox.Option
                key={currency}
                value={currency}
                className="ui-active:bg-black ui-active:text-white"
              >
                {currency}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}
