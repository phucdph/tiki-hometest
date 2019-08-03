import { stateContext, initialState, IHistoryState } from './state';
import { createReducers } from '../../utils/redux';
import { saveHistoryNews } from './actions';
import { INew } from '../../services/typings';
import { Action } from 'redux-actions';
import produce from 'immer';

const reducers = [
  {
    on: saveHistoryNews,
    reducer(state: IHistoryState, action: Action<INew>) {
      return produce(state, (draft: IHistoryState) => {
        draft.data.unshift(action.payload);
      });
    }
  }
];

export default createReducers(stateContext, reducers, initialState);