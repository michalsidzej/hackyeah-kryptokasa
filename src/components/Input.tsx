export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="px-3 py-2 border border-gray-100-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
      {...props}
    />
  );
}
