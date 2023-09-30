import { Label, LabelProps } from "@radix-ui/react-label";
import { Input, InputProps } from "./Input";

export interface InputWithLabelProps {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
}

export function InputWithLabel(props: InputWithLabelProps) {
  return (
    <div>
      <Label htmlFor={props.id}>{props.label}</Label>
      <Input id={props.id} type={props.type} placeholder={props.placeholder} />
    </div>
  );
}
