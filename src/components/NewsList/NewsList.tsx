import { Link } from "react-router";
import type { NewsItem } from "../../types";

type Props = {
  news: NewsItem[];
};

export function NewsList({ news }: Props) {
  return (
    <ul>
      {news.map((item) => (
        <li key={item.id}>
          <Link to={`/frettir/${item.slug}`}>{item.title}</Link>
          <span> eftir {item.author.name}</span>
          <p>{item.excerpt}</p>
        </li>
      ))}
    </ul>
  );
}
