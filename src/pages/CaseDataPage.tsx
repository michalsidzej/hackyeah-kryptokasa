import { useContext, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { CaseDataContext } from "../App";
import { useNavigate } from "react-router-dom";
import { LandingIcon } from "../icons/Landing";

export interface CaseData {
  organName: string;
  caseId: string;
  owner: string;
  id: string;
}

export function CaseDataPage() {
  const navigate = useNavigate();
  const dataContext = useContext(CaseDataContext);
  const [formState, setFormState] = useState<CaseData>(
    dataContext.caseData ?? {
      organName: "",
      caseId: "",
      owner: "",
      id: "",
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
    <div className="flex">
      <section className="w-[500px]" onSubmit={handleSubmit}>
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
            <Label text="Posiadacz kryptoaktywa" />
            <Input
              name="owner"
              value={formState.owner}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <Label text="ID posiadacza" />
            <Input
              name="id"
              value={formState.id}
              onChange={handleInputChange}
            />
          </div>
          <Button text="Dalej" blue type="submit" />
        </form>
      </section>
      <div className="max-w-[800px] pl-10">
        <LandingIcon height={600} />
      </div>
    </div>
  );
}
