import React from 'react';
import { HashRouter, Route, Switch ,Redirect} from 'react-router-dom';
import { createBrowserHistory } from "history";

import './css/hacker.css';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const Page404 = React.lazy(() => import('./views/Pages/Page404'))
const Page500 = React.lazy(() => import('./views/Pages/Page500'))
const Home = React.lazy(() => import('./views/Pages/Home'))
// const Home = React.lazy(() => import('./views/LevelOne'))
const Dashboard = React.lazy(() => import('./containers/Dashboard'))
const LevelOne = React.lazy(() => import('./views/LevelOne'))
const LeaderBoard = React.lazy(() => import('./views/Pages/Home/LeaderBoard'))
function App() {
	return (
		<BrowserRouter history={createBrowserHistory()}>
			<React.Suspense fallback={loading()}>
				<Switch>
					{/* <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
					<Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} /> */}
					<Route path="/dashboard" name="Dashboard" render={props => <Dashboard {...props} />} />
					<Route exact path="/" name="Home" render={props => <Home {...props} />} />
					{/* <Redirect push from="/dashboard" to="/" /> */}
					<Route path="/levelone" render={props => <LevelOne {...props} />} />
				</Switch>
			</React.Suspense>
		</ BrowserRouter>
	);
}

export default App;
