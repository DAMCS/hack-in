import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import './css/hacker.css';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const Page404 = React.lazy(() => import('./views/Pages/Page404'))
const Page500 = React.lazy(() => import('./views/Pages/Page500'))
const Home = React.lazy(() => import('./views/Pages/Home'))
const Dashboard = React.lazy(() => import('./containers/Dashboard'))
const LeaderBoard = React.lazy(() => import('./views/Pages/Home/LeaderBoard/LeaderBoard'))

function App() {
	return (
		<BrowserRouter history={createBrowserHistory()}>
			<React.Suspense fallback={loading()}>
				<Switch>
					<Route exact path="/" name="Home" render={props => <Home {...props} />} />
					<Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
					<Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
					<Route exact path="/dashboard" name="Dashboard" render={props => <Dashboard {...props} />} />
					{/* <Route path="/leaderboard" name="Leaderboard" render={props => <LeaderBoard {...props} />} /> */}
					<Route component={Page404} />
				</Switch>
			</React.Suspense>
		</ BrowserRouter>
	);
}

export default App;
