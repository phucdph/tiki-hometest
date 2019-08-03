import React from 'react'
import NewsList from '../News/components/NewsList';
import { useSelector, shallowEqual } from 'react-redux';
import { IHistoryState } from './state';
import { historyStateSelector } from './selectors';

const History = () => {
  const history: IHistoryState = useSelector(historyStateSelector, shallowEqual)
  return (
    <NewsList data={history.data} saveHistory={false}/>
  )
}

export default History;