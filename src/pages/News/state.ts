import { INewsResponse, INewsRequest } from '../../services/typings';

export const stateContext = 'News';

export interface INewsState {
  action: string;
  error: any;
  data: INewsResponse;
  request: INewsRequest;
}

export const initialState: INewsState = {
  action: '',
  error: null,
  data: {
    status: '',
    articles: [],
    totalResults: 0,
  },
  request: {
    q: '',
    sources: [],
    pageSize: 20,
    page: 1,
  }
}