import type { NewsItem, NewsItemResult, AuthorResult } from "../types";

type ApiResult<T> =
  | {
      data: T;
      ok: true;
    }
  | {
      ok: false;
      reason: "error" | "not-found";
      error?: Error;
    };

const API_URL = import.meta.env.VITE_API_URL || "";

export async function fetchFromApi<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResult<T>> {
  let url;
  try {
    url = new URL(path, API_URL);
  } catch (e) {
    return { ok: false, reason: "error", error: e as Error };
  }

  let response;
  try {
    response = await fetch(url, options);
  } catch (e) {
    return { ok: false, reason: "error", error: e as Error };
  }

  if (response.status === 404) {
    return { ok: false, reason: "not-found" };
  }

  if (!response.ok) {
    console.error("response failed", response.status, response.statusText);
    return { ok: false, reason: "error", error: new Error("not 2xx") };
  }

  let json;
  try {
    json = await response.json();
  } catch (e) {
    return { ok: false, reason: "error", error: e as Error };
  }

  return { ok: true, data: json as T };
}

export async function getNews(
  limit = 10,
  offset = 0
): Promise<ApiResult<NewsItemResult>> {
  return fetchFromApi(`/news?limit=${limit}&offset=${offset}`);
}

export async function getNewsItem(
  slug: string
): Promise<ApiResult<NewsItem>> {
  return fetchFromApi(`/news/${slug}`);
}

export async function getAuthors(): Promise<ApiResult<AuthorResult>> {
  return fetchFromApi("/authors");
}

type CreateNewsBody = {
  title: string;
  excerpt: string;
  content: string;
  authorId: number;
  published: boolean;
};

export async function createNewsItem(
  body: CreateNewsBody
): Promise<ApiResult<NewsItem>> {
  return fetchFromApi<NewsItem>("/news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
