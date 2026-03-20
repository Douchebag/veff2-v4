
export type NewsAuthor = {
  id: number;
  name: string;
  email: string;
};

export type NewsItem = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  authorId: number;
  author: NewsAuthor;
};

export type Paging = {
  limit: number;
  offset: number;
  total: number;
};

export type NewsItemResult = {
  data: Array<NewsItem>;
  paging: Paging;
};

export type AuthorResult = {
  data: Array<NewsAuthor>;
  paging: Paging;
};

export type NewsState = "initial" | "loading" | "error" | "data" | "empty";
