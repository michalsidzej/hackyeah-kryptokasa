import { InputWithLabel } from "./components/InputWithLabel";
import { useDownloader } from "./downloader/usePriceDownloader";
import { createRoot } from "react-dom/client";

function App() {
  const prices = useDownloader();
  console.log(prices);

  return (
    <>
      <InputWithLabel
        id="coins"
        label="Kryptowaluty"
        type="text"
        placeholder="Wpisz kryptowalutę"
      />
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
