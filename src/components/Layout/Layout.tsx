import { Link } from "react-router";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Forsíða</Link>
          {" | "}
          <Link to="/ny-frett">Ný frétt</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>Fréttir 2026</p>
      </footer>
    </div>
  );
}
