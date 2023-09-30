import React from "react";
import { DropdownArrowIcon } from "../icons/DropdownArrowIcon";
import cx from "classnames";

export interface CurrencyData {
  name: string;
  amount: number;
  avgPrice: number;
  prices: ValueRecord[];
}

interface ValueRecord {
  provider: string;
  value: number;
  amount: number;
}

interface CurrencyTableProps {
  data: CurrencyData[];
}

export function CurrencyTable(props: CurrencyTableProps) {
  return (
    <div className="p-8">
      <div className="min-w-[800px] grid grid-cols-12">
        <span className="text-left col-span-9">Nazwa kryptowaluty</span>
        <span className="col-span-1">ilość</span>
        <span className="col-span-2">średnia wartość</span>

        <hr className="col-span-12 border-gray" />

        {props.data.map((currency, i) => (
          <TableRow
            key={i}
            name={currency.name}
            amount={currency.amount}
            avgPrice={currency.avgPrice}
            prices={currency.prices}
          />
        ))}
      </div>
    </div>
  );
}

export function TableRow(props: CurrencyData) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="relative col-span-12 grid grid-cols-12">
      <DropdownArrowIcon
        className={cx(
          "absolute -left-[24px] transition-all",
          isExpanded && "rotate-180"
        )}
        width={24}
        height={24}
        onClick={() => setIsExpanded(!isExpanded)}
      />
      <span className="col-span-9 font-medium">{props.name}</span>
      <span>{props.amount}</span>
      <span className="font-medium col-span-2">{props.avgPrice}</span>
      {props.prices.map((price) => (
        <div
          className={cx(
            "col-span-12 grid grid-cols-12 transition-all overflow-hidden",
            isExpanded ? "max-h-full" : "max-h-0 invisible"
          )}
        >
          <span className="col-span-9">
            {capitalizeFirstLetter(price.provider)}
          </span>
          <span>{price.amount}</span>
          <span className="col-span-2">{price.amount}</span>
        </div>
      ))}
    </div>
  );
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
