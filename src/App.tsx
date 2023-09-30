import { createRoot } from "react-dom/client";
import { CurrencyForm, CurrencyRecord } from "./components/CurrencyForm";
import { CurrencyTable } from "./components/CurrencyTable";
import { useState } from "react";
import { useDownloader } from "./downloader/useDownloader";

function App() {
  const [selectedCurrencies, setSelectedCurrencies] = useState<
    CurrencyRecord[]
  >([]);

  const data = useDownloader(selectedCurrencies);

  return (
    <div className="p-4 flex">
      <CurrencyForm
        onSubmit={(currencyRecord) =>
          setSelectedCurrencies([...selectedCurrencies, currencyRecord])
        }
      />
      <CurrencyTable data={data} />
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
