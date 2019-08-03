import { getNews, getNewsSuccess, getNewsFail, getNextNews, getNextNewsFail, getNextNewsSuccess } from './actions';
import { createSagas } from '../../utils/redux';
import { Action } from 'redux-actions';
import { INewsRequest } from '../../services/typings';
import { newsService } from '../../services/newsService';
import { call, put } from 'redux-saga/effects';


const getNewsSaga = {
  on: getNews,
  *worker(action: Action<INewsRequest>) {
    try {
      const req = action.payload;
      const res = yield call(newsService.get, req);
      yield put(getNewsSuccess(res));
    }
    catch (error) {
      yield put(getNewsFail({ error }));
    }
  }
}

const getNextNewsSaga = {
  on: getNextNews,
  *worker(action: Action<INewsRequest>) {
    try {
      const req = action.payload;
      const res = yield call(newsService.get, req);
      yield put(getNextNewsSuccess(res));
    }
    catch (error) {
      yield put(getNextNewsFail({ error }));
    }
  }
}

export default createSagas([getNewsSaga, getNextNewsSaga]);