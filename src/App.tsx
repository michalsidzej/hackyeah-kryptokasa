import { createRoot } from "react-dom/client";
import { Header } from "./components/Header";
import { HashRouter, Route, Routes } from "react-router-dom";
import { CurrencySelector } from "./pages/CurrencySelector";
import { createContext, useState } from "react";
import { CaseData, CaseDataPage } from "./pages/CaseDataPage";
import { Footer } from "./components/Footer";
import { AssetData } from "./components/CurrencyTable";

export const CaseDataContext = createContext(null);
export const AssetDataContext = createContext(null);
export const UsdPriceContext = createContext(null);

function App() {
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [assetData, setAssetData] = useState<AssetData[] | null>(null);
  const [usdPrice, setUsdPrice] = useState<number | null>(null);

  return (
    <CaseDataContext.Provider value={{ caseData, setCaseData }}>
      <AssetDataContext.Provider value={{ assetData, setAssetData }}>
        <UsdPriceContext.Provider value={{ usdPrice, setUsdPrice }}>
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
        </UsdPriceContext.Provider>
      </AssetDataContext.Provider>
    </CaseDataContext.Provider>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
