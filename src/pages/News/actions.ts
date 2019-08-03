import { createAsyncAction } from "../../utils/redux";

export const { getNews, getNewsSuccess, getNewsFail } = createAsyncAction(
  "getNews",
  "GET_NEWS"
);

export const { getNextNews, getNextNewsSuccess, getNextNewsFail } = createAsyncAction(
  "getNextNews",
  "GET_NEXT_NEWS"
);

