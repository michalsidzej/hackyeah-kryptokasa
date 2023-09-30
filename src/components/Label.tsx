interface LabelProps {
  text: string;
}

export function Label(props: LabelProps) {
  return <label className="block font-bold mb-2 text-xs">{props.text}</label>;
}
