import { createRoot } from "react-dom/client";
import { CurrencyForm } from "./components/CurrencyForm";
import { CurrencyData, CurrencyTable } from "./components/CurrencyTable";

function App() {
  const data: CurrencyData[] = [
    {
      name: "Bitcoin (BTC)",
      amount: 0.0001,
      avgPrice: 10000,
      prices: [
        {
          provider: "kraken",
          value: 10000,
          amount: 0.0001,
        },
        {
          provider: "zonda",
          value: 10000,
          amount: 0.0001,
        },
      ],
    },
  ];
  return (
    <div className="p-4 flex ">
      <CurrencyForm />
      <CurrencyTable data={data} />
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
