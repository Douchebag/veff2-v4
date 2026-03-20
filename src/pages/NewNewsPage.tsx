import { Link } from "react-router";
import { NewsForm } from "../components/NewsForm/NewsForm";

export function NewNewsPage() {
  return (
    <section>
      <h1>Búa til frétt</h1>
      <NewsForm />
      <p>
        <Link to="/">Aftur á forsíðu</Link>
      </p>
    </section>
  );
}
