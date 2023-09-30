import { InputWithLabel } from "./components/InputWithLabel";
import { usePriceDownloader } from "./downloader/usePriceDownloader";
import { createRoot } from "react-dom/client";
import { useCurrencies } from "./useCurrencies";
import { currenciesConfig } from "./config";

function App() {
  const baseCurrencies = currenciesConfig.map((currency) => currency.symbol);
  const currencies = useCurrencies(baseCurrencies);

  return (
    <>
      <InputWithLabel
        id="coins"
        label="Kryptowaluty"
        type="text"
        placeholder="Wpisz kryptowalutę"
      />
      {currencies.map((currency) => (
        <section key={currency.baseCurrency}>
          <div>{currency.baseCurrency}</div>
          <table>
            <thead>
              <tr>
                <th>Źródło</th>
                <th>Cena</th>
              </tr>
            </thead>
            <tbody>
              {currency.prices.map((price, i) => (
                <tr key={i}>
                  <td>{price.provider}</td>
                  <td>{price.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
