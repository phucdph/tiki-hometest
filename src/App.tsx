import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { configureStore, history } from './store';
import { ConnectedRouter } from 'connected-react-router';
import Main from './screens/Main';

const store = configureStore()

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path ={'/'} component={Main}/>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
