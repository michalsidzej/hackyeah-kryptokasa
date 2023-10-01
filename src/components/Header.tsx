import { Link } from "react-router-dom";
import { MfLogoIcon } from "../icons/MfLogo";

export function Header() {
  return (
    <header className="px-10 py-2">
      <nav className="flex items-center justify-between">
        <Link to="/">
          <MfLogoIcon className="h-32 w-64" />
        </Link>
        <span className="text-md font-bold">Instrukcja obsługi</span>
      </nav>
      <hr className="border-gray-100" />
    </header>
  );
}
