import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createNewsItem, getAuthors } from "../../lib/news.api";
import type { NewsAuthor } from "../../types";

export function NewsForm() {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<NewsAuthor[]>([]);
  const [formState, setFormState] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAuthors = async () => {
      const result = await getAuthors();
      if (result.ok) {
        setAuthors(result.data.data);
      }
    };
    fetchAuthors();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const authorId = Number(formData.get("authorId"));
    const published = formData.get("published") === "on";

    setFormState("loading");
    setErrorMessage("");

    const result = await createNewsItem({ title, excerpt, content, authorId, published });

    if (result.ok) {
      navigate(`/frettir/${result.data.slug}`);
    } else {
      setFormState("error");
      setErrorMessage(result.error?.message ?? "Villa kom upp við að búa til frétt.");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Titill:</label>
        <input id="title" type="text" name="title" required maxLength={200} />
      </div>
      <div>
        <label htmlFor="excerpt">Útdráttur:</label>
        <input id="excerpt" type="text" name="excerpt" required maxLength={500} />
      </div>
      <div>
        <label htmlFor="content">Texti:</label>
        <textarea id="content" name="content" required />
      </div>
      <div>
        <label htmlFor="authorId">Höfundur:</label>
        <select id="authorId" name="authorId" required>
          <option value="">Veldu höfund</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="published">Birta:</label>
        <input id="published" type="checkbox" name="published" />
      </div>
      {formState === "error" && <p role="alert">{errorMessage}</p>}
      <button type="submit" disabled={formState === "loading"}>
        {formState === "loading" ? "Hleð..." : "Búa til frétt"}
      </button>
    </form>
  );
}
