import { Input } from "./Input";
import { Label } from "./Label";

interface CurrencyAmountInputProps {
  className?: string;
  value: number;
  onChange: (value: number) => void;
}

export function CurrencyAmountInput(props: CurrencyAmountInputProps) {
  return (
    <div className={props.className}>
      <Label text="Ilość aktywu" />
      <Input
        type="number"
        placeholder="0.00"
        value={props.value}
        onChange={(e) => props.onChange(e.target.valueAsNumber)}
      />
    </div>
  );
}
