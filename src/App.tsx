import * as ReactDOM from "react-dom";
import { InputWithLabel } from "./components/InputWithLabel";

function App() {
  return (
    <>
      <InputWithLabel
        id="coins"
        label="Kryptowaluty"
        type="text"
        placeholder="Wpisz kryptowelutę"
      />
    </>
  );
}

function render() {
  ReactDOM.render(App(), document.body);
}

render();
