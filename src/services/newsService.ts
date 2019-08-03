import { INewsRequest, INewsResponse } from "./typings";
import querystring from "querystring";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

class NewsService {
  async get(req: INewsRequest): Promise<INewsResponse> {
    const request = {
      ...req,
      apiKey: API_KEY
    };
    const res = await fetch(
      `https://newsapi.org/v2/everything?${querystring.stringify(request)}`,
      {
        method: "GET"
      }
    );
    const json = await res.json();
    return json;
  }
}

export const newsService = new NewsService();
