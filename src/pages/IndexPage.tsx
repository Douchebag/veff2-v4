import { useEffect, useState } from "react";
import { LoadingSkeleton } from "../components/LoadingSkeleton/LoadingSkeleton";
import { NewsList } from "../components/NewsList/NewsList";
import { getNews } from "../lib/news.api";
import type { NewsState, NewsItemResult } from "../types";

const PAGE_SIZE = 10;

export function IndexPage() {
  const [newsState, setNewsState] = useState<NewsState>("initial");
  const [news, setNews] = useState<NewsItemResult | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setNewsState("loading");
      const newsResponse = await getNews(PAGE_SIZE, offset);

      if (newsResponse.ok) {
        setNews(newsResponse.data);
        setNewsState(newsResponse.data.data.length === 0 ? "empty" : "data");
      } else {
        setNewsState("error");
        console.error("error fetching news", newsResponse.error);
      }
    };

    fetchData();
  }, [offset]);

  const total = news?.paging.total ?? 0;
  const hasPrev = offset > 0;
  const hasNext = offset + PAGE_SIZE < total;

  return (
    <section>
      <h1>Fréttir</h1>
      {newsState === "loading" && <LoadingSkeleton />}
      {newsState === "data" && news && <NewsList news={news.data} />}
      {newsState === "empty" && <p>Engar fréttir fundust.</p>}
      {newsState === "error" && <p>Villa kom upp við að sækja fréttir.</p>}
      {newsState === "data" && (
        <div>
          <button disabled={!hasPrev} onClick={() => setOffset(offset - PAGE_SIZE)}>
            Fyrri
          </button>
          <span> Síða {Math.floor(offset / PAGE_SIZE) + 1} af {Math.ceil(total / PAGE_SIZE)} </span>
          <button disabled={!hasNext} onClick={() => setOffset(offset + PAGE_SIZE)}>
            Næsta
          </button>
        </div>
      )}
    </section>
  );
}
