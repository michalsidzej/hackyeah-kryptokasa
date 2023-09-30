import { createRoot } from "react-dom/client";
import { Header } from "./components/Header";
import { HashRouter, Route, Routes } from "react-router-dom";
import { CurrencySelector } from "./pages/CurrencySelecing";
import { createContext, useState } from "react";
import { CaseData, CaseDataPage } from "./pages/CaseDataPage";

export const CaseDataContext = createContext(null);

function App() {
  const [caseData, setCaseData] = useState<CaseData | null>(null);

  return (
    <CaseDataContext.Provider value={{ caseData, setCaseData }}>
      <HashRouter>
        <Header />
        <div className="px-10 py-8">
          <Routes>
            <Route path="/" Component={CaseDataPage} />
            <Route path="/currency-selector" Component={CurrencySelector} />
          </Routes>
        </div>
      </HashRouter>
    </CaseDataContext.Provider>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
