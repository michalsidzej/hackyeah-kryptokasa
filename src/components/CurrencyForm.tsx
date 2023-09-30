import { Button } from "./Button";
import { CurrencyAmountInput } from "./CurrencyAmountInput";
import { CurrencySelect } from "./CurrencySelect";

export function CurrencyForm() {
  return (
    <section className="min-w-[500px]">
      <h2 className="mb-3 text-xxl">Wyszukaj kryptowalutę</h2>
      <p className="mb-10">
        System automatycznie znajdzie dzisiejszą cenę aktywów. Możesz też
        wprowadzić dane manualnie.
      </p>
      <form className="flex flex-col gap-2">
        <CurrencySelect className="mb-2" />
        <CurrencyAmountInput className="mb-3" />
        <div className="flex gap-3">
          <Button text="Usuń" onClick={() => {}} />
          <Button text="Dodaj" onClick={() => {}} blue />
        </div>
      </form>
    </section>
  );
}
