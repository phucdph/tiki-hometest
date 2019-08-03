import { createStore, applyMiddleware, combineReducers } from 'redux';
import appReducers from './reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import sagas from './sagas';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['NewsHistory'],
}


const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();


const reducers = combineReducers({
  router: connectRouter(history),
  ...appReducers
});

const persistedReducer = persistReducer(persistConfig, reducers)


function configureStore() {
  const middlewares = [sagaMiddleware, routeMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  return createStore((persistedReducer), ...enhancers);
}

const store = configureStore();

const persistor = persistStore(store)

sagas.forEach(saga => {
  sagaMiddleware.run(saga as any);
});


export { store, history, persistor };
