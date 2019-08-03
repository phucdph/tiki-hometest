import { INew } from '../../services/typings';

export const stateContext = "NewsHistory";

export interface IHistoryState {
  data: INew[];
}

export const initialState: IHistoryState = {
  data: [],
}