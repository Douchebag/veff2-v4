import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import { getNewsItem } from "../lib/news.api";
import { LoadingSkeleton } from "../components/LoadingSkeleton/LoadingSkeleton";
import type { NewsItem, NewsState } from "../types";

export function NewsPage() {
  const params = useParams();
  const [newsState, setNewsState] = useState<NewsState>("initial");
  const [news, setNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setNewsState("loading");
      const newsResponse = await getNewsItem(params.slug ?? "");

      if (newsResponse.ok) {
        setNews(newsResponse.data);
        setNewsState("data");
      } else if (newsResponse.reason === "not-found") {
        setNewsState("empty");
      } else {
        setNewsState("error");
      }
    };

    fetchData();
  }, [params.slug]);

  return (
    <section>
      {newsState === "loading" && <LoadingSkeleton />}
      {newsState === "empty" && <p>Frétt fannst ekki.</p>}
      {newsState === "error" && <p>Villa kom upp við að sækja frétt.</p>}
      {newsState === "data" && news && (
        <>
          <h1>{news.title}</h1>
          <p><strong>Höfundur:</strong> {news.author.name}</p>
          <p>{news.excerpt}</p>
          <div>{news.content}</div>
        </>
      )}
      <p>
        <Link to="/">Aftur á forsíðu</Link>
      </p>
    </section>
  );
}
