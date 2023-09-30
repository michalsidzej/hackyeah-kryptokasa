import React, { useEffect } from "react";
import { DropdownArrowIcon } from "../icons/DropdownArrowIcon";
import cx from "classnames";

export interface AssetData {
  name: string;
  symbol: string;
  amount: number;
  avgPrice: number;
  value: number;
  prices: ValueRecord[];
}

interface ValueRecord {
  provider: string;
  value: number;
  amount: number;
}

interface AssetTableProps {
  data: AssetData[];
}

export function AssetTable(props: AssetTableProps) {
  const [isExpanded, setIsExpanded] = React.useState<boolean[]>([]);

  useEffect(() => {
    setIsExpanded(props.data.map(() => false));
  }, [props.data]);

  return (
    <div className="min-w-[800px] grid grid-cols-12">
      <span className="text-left col-span-9">Nazwa kryptowaluty</span>
      <span className="col-span-1">ilość</span>
      <span className="col-span-2">średnia wartość</span>

      <hr className="col-span-12 border-gray-100" />

      {props.data.map((currency, i) => (
        <TableRow
          key={i}
          data={currency}
          isExpanded={isExpanded[i]}
          setIsExpanded={() =>
            setIsExpanded(isExpanded.map((x, j) => (j === i ? !x : x)))
          }
        />
      ))}
    </div>
  );
}

interface TableRowProps {
  data: AssetData;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

export function TableRow(props: TableRowProps) {
  return (
    <div className="relative col-span-12 grid grid-cols-12">
      <DropdownArrowIcon
        className={cx(
          "absolute -left-[24px] transition-all",
          props.isExpanded && "rotate-180"
        )}
        width={24}
        height={24}
        onClick={() => props.setIsExpanded(!props.isExpanded)}
      />
      <span className="col-span-9 font-medium">
        {props.data.name} ({props.data.symbol})
      </span>
      <span>{props.data.amount}</span>
      <span className="font-medium col-span-2">
        {props.data.value.toFixed(2)}
      </span>
      {props.data.prices.map((price, i) => (
        <div
          className={cx(
            "col-span-12 grid grid-cols-12 transition-all overflow-hidden",
            props.isExpanded ? "max-h-full" : "max-h-0 invisible"
          )}
          key={i}
        >
          <span className="col-span-9">
            {capitalizeFirstLetter(price.provider)}
          </span>
          <span>{price.amount}</span>
          <span className="col-span-2">{price.value.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
