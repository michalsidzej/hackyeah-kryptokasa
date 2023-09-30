import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="px-10 py-2">
      <nav>
        <Link to="/">
          <img src="/assets/MF_logo.png" alt="logo" />
        </Link>
      </nav>
      <hr className="border-gray" />
    </header>
  );
}
