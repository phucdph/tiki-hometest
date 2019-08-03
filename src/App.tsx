import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { store, history, persistor } from "./store";
import { ConnectedRouter } from "connected-react-router";
import Navbar from "./components/Navbar";
import { PersistGate } from "redux-persist/integration/react";

const News = React.lazy(() => import("./pages/News"));
const History = React.lazy(() => import("./pages/History"));

interface IProps {}

class App extends React.Component<IProps> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <>
              <Navbar />
              <Suspense fallback={null}>
                <Switch>
                  <Route exact path={"/"} component={News} />
                  <Route path={"/history"} component={History} />
                </Switch>
              </Suspense>
            </>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
