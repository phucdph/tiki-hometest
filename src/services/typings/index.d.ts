export interface INewsRequest {
  q?: string;
  sources?: string[];
  pageSize?: number;
  page?: number;
}

interface ISource {
  id: string;
  name: string;
}

export interface INew {
  source: ISource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface INewsResponse {
  status: string;
  totalResults: number;
  articles: INew[];
}