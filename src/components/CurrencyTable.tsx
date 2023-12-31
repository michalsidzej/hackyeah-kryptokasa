import React, { useEffect } from "react";
import { DropdownArrowIcon } from "../icons/DropdownArrowIcon";
import cx from "classnames";
import { ValueRecord } from "../peripherals/types";

export interface AssetData {
  name: string;
  symbol: string;
  amount: number;
  avgPrice: number;
  value: number;
  prices: ValueRecord[];
}

interface AssetTableProps {
  data: AssetData[];
  usdPrice?: number;
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
          usdPrice={props.usdPrice}
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
  usdPrice?: number;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

export function TableRow(props: TableRowProps) {
  return (
    <div className="relative col-span-12 grid grid-cols-12 py-1">
      <DropdownArrowIcon
        className={cx(
          "absolute -left-[24px] transition-all top-4",
          props.isExpanded && "rotate-180"
        )}
        width={24}
        height={24}
        onClick={() => props.setIsExpanded(!props.isExpanded)}
      />
      <div className="col-span-9 font-medium flex items-center">
        {props.data.name} ({props.data.symbol})
      </div>
      <div className="flex items-center opacity-50">{props.data.amount}</div>
      <div className="font-medium col-span-2 flex items-center">
        <div>
          <div>{props.data.value.toFixed(2)} USD</div>
          <div>{(props.data.value * (props.usdPrice ?? 0)).toFixed(2)} PLN</div>
        </div>
      </div>
      {props.data.prices.map((price, i) => (
        <div
          className={cx(
            "col-span-12 grid grid-cols-12 transition-all overflow-hidden",
            props.isExpanded ? "max-h-full" : "max-h-0 invisible"
          )}
          key={i}
        >
          <span className="col-span-6">
            {capitalizeFirstLetter(price.name)}
          </span>
          <span className="col-span-4">{price.url}</span>
          <span className="col-span-2">{price.price?.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}

function capitalizeFirstLetter(string?: string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}
