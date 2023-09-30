import { createRoot } from "react-dom/client";
import { CurrencyForm } from "./components/CurrencyForm";

function App() {
  return (
    <div className="p-4">
      <CurrencyForm />
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
