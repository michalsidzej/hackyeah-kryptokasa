import { useContext, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { CaseDataContext } from "../App";
import { useNavigate } from "react-router-dom";

export interface CaseData {
  organName: string;
  caseId: string;
  nameAndSurname: string;
  pesel: string;
}

export function CaseDataPage() {
  const navigate = useNavigate();
  const dataContext = useContext(CaseDataContext);
  const [formState, setFormState] = useState<CaseData>(
    dataContext.caseData ?? {
      organName: "",
      caseId: "",
      nameAndSurname: "",
      pesel: "",
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dataContext.setCaseData(formState);
    console.log(formState);
    navigate("/currency-selector");
  };

  return (
    <section className="min-w-[500px]" onSubmit={handleSubmit}>
      <h2 className="mb-3 text-xxl">Wprowadź dane sprawy</h2>
      <form>
        <div className="mb-4">
          <Label text="Nazwa organu egzekucyjnego" />
          <Input
            name="organName"
            value={formState.organName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <Label text="Numer sprawy" />
          <Input
            name="caseId"
            value={formState.caseId}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <Label text="Imię i nazwisko właściciela kryptoaktywa" />
          <Input
            name="nameAndSurname"
            value={formState.nameAndSurname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <Label text="PESEL właściciela kryptoaktywa" />
          <Input
            name="pesel"
            value={formState.pesel}
            onChange={handleInputChange}
          />
        </div>
        <Button text="Dalej" blue type="submit" />
      </form>
    </section>
  );
}
