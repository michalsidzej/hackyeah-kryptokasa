import { createRoot } from "react-dom/client";
import { Header } from "./components/Header";
import { HashRouter, Route, Routes } from "react-router-dom";
import { CurrencySelector } from "./pages/CurrencySelecing";
import { createContext, useState } from "react";
import { CaseData, CaseDataPage } from "./pages/CaseDataPage";
import { Footer } from "./components/Footer";

export const CaseDataContext = createContext(null);

function App() {
  const [caseData, setCaseData] = useState<CaseData | null>(null);

  return (
    <CaseDataContext.Provider value={{ caseData, setCaseData }}>
      <HashRouter>
        <Header />
        <main className="px-10 py-8 grow">
          <Routes>
            <Route path="/" Component={CaseDataPage} />
            <Route path="/currency-selector" Component={CurrencySelector} />
          </Routes>
        </main>
        <Footer />
      </HashRouter>
    </CaseDataContext.Provider>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
