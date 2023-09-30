import cx from "classnames";

interface ButtonProps {
  text: string;
  blue?: boolean;
  type?: "submit";
}

export function Button(props: ButtonProps) {
  return (
    <button
      className={cx(
        "px-3 py-2 font-medium w-32 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
        props.blue ? "bg-blue text-white" : "bg-white text-black"
      )}
      type={props.type}
    >
      {props.text}
    </button>
  );
}
