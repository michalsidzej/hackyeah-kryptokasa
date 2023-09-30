interface LabelProps {
  text: string;
}

export function Label(props: LabelProps) {
  return (
    <label className="block font-bold leading-tight text-xs">
      {props.text}
    </label>
  );
}
