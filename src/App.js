import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const Page404 = React.lazy(() => import('./views/Pages/Page404'))
const Page500 = React.lazy(() => import('./views/Pages/Page500'))
const Home = React.lazy(() => import('./views/Pages/Home'))
const Dashboard = React.lazy(() => import('./containers/Dashboard'))

function App() {
  return (
    <HashRouter history={createBrowserHistory()}>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
          <Route exact path="/dashboard" name="Dashboard" render={props => <Dashboard {...props} />} />
          <Route path="/" name="Home" render={props => <Home {...props} />} />
        </Switch>
      </React.Suspense>
    </ HashRouter>
  );
}

export default App;
