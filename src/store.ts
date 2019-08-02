import { createStore, applyMiddleware, combineReducers } from 'redux';
import appReducers from './reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import sagas from './sagas';


const history = createHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();


const reducers = combineReducers({
  router: connectRouter(history),
  ...appReducers
});

function configureStore() {
  const middlewares = [sagaMiddleware, routeMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  return createStore((reducers), ...enhancers);
}

sagas.forEach(saga => {
  sagaMiddleware.run(saga as any);
});


export { configureStore, history };
