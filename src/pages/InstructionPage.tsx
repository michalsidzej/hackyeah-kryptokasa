import { useNavigate } from "react-router-dom";
import { InstructionIcon } from "../icons/InstructionIcon";
import { Button } from "../components/Button";

export function InstructionPage() {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <section className="w-[500px]">
        <h2 className="mb-10 text-xxl">Informacje o aplikacji</h2>
        <p>
          Witaj w narzędziu do szacowania wartości kryptowalut. Liczenie
          wartości takich aktywów nie różni się zbytno od szacowania wartości
          samochodu czy nieruchomości. Zadanie polega na sprawdzeniu kursu
          aktywa w danym dniu i pomnożenie go przez jego ilość, a następnie
          przez kurs waluty niewirtualnej np. PLN.
        </p>
        <p className="font-bold mt-4">Krok po kroku:</p>
        <ol className="list-decimal py-2 px-4 font-bold">
          <li className="mb-3">
            Wprowadź dane sprawy. Możesz przełączać formularz pomiędzy osobą
            fizyczną, a organizacją
          </li>
          <li className="mb-3">
            Wpisz nazwę lub ID waluty. W podpowiedziach znajdziesz wszystkie
            najpopularniejsze kryptowaluty.
          </li>
          <li className="mb-3">
            Wpisz ilość waluty. Jest to ilość aktywów, których wartość chcesz
            oszacować. np. 0,0050 BTC (Bitcoina)
          </li>
          <li className="mb-3">
            Jeśli chcesz, możesz także wpisać wartości ręcznie. Wówczas
            potrzebujesz danych z 3 niezależnych źródeł (np. Coinbase, Binance),
            aby dokonać kalkulacji.
          </li>
          <li className="mb-3">
            Wygeneruj raport w formacie PDF, który zawiera wszystkie informacje
            potrzebne do dalszej egzekucji
          </li>
        </ol>
        <p>
          Szacowanie wartości kryptoaktywów odbywa się na podstawie średniej
          arytmetycznej wybranej z listy giełd kryptowalut. Wartość PLN podana
          jest wg kursu NBP z ostatniego dnia roboczego.
        </p>
        <Button
          text="Wróć"
          blue
          onClick={() => navigate("/")}
          className="mt-4"
        />
      </section>
      <div className="max-w-[800px] pl-10 flex items-center">
        <InstructionIcon height={600} />
      </div>
    </div>
  );
}
