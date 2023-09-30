import { Input } from "./Input";
import { Label } from "./Label";

export function CurrencyAmountInput(props: { className?: string }) {
  return (
    <div className={props.className}>
      <Label text="Ilość aktywu" />
      <Input type="number" placeholder="0.00" />
    </div>
  );
}
