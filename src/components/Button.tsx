import cx from "classnames";

interface ButtonProps {
  text: string;
  blue?: boolean;
  preventDefault?: boolean;
  onClick?: () => void;
  type?: "submit";
  className?: string;
}

export function Button(props: ButtonProps) {
  return (
    <button
      className={cx(
        "px-3 py-2 font-medium min-w-[120px] border border-gray-100-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
        props.blue ? "bg-blue text-white" : "bg-white text-black",
        props.className
      )}
      onClick={(e) => {
        if (props.preventDefault) {
          e.preventDefault();
        }
        props.onClick && props.onClick();
      }}
      type={props.type}
    >
      {props.text}
    </button>
  );
}
