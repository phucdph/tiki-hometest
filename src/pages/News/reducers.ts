import { createReducers } from '../../utils/redux';
import { stateContext, initialState, INewsState } from './state';
import { getNews, getNewsSuccess, getNewsFail, getNextNews, getNextNewsSuccess, getNextNewsFail } from './actions';
import { Action } from 'redux-actions';
import { INewsRequest, INewsResponse } from '../../services/typings';
import { produce } from 'immer';

const reducers = [
  {
    on: [getNews, getNextNews],
    reducer(state: INewsState, action: Action<INewsRequest>): INewsState {
      return produce(state, (draft: INewsState) => {
        draft.request = action.payload;
        draft.action = action.type;
      });
    }
  },
  {
    on: getNewsSuccess,
    reducer(state: INewsState, action: Action<INewsResponse>): INewsState {
      return produce(state, (draft: INewsState) => {
        draft.action = action.type;
        draft.data = action.payload;
      });
    }
  },
  {
    on: getNextNewsSuccess,
    reducer(state: INewsState, action: Action<INewsResponse>): INewsState {
      const { articles } = action.payload;
      return produce(state, (draft: INewsState) => {
        draft.action = action.type;
        draft.data.articles = draft.data.articles.concat(articles);
      });
    }
  },
  {
    on: [getNewsFail, getNextNewsFail],
    reducer(state: INewsState, action: Action<{ error: any }>): INewsState {
      const { error } = action.payload;
      return produce(state, (draft: INewsState) => {
        draft.action = action.type;
        draft.error = error;
      });
    }
  }
];

export default createReducers(stateContext, reducers, initialState);