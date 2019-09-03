import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { ToastContainer } from 'react-toastify'
import './App.scss';
import ReactGA from 'react-ga';

function initializeReactGA() {
	ReactGA.initialize('UA-104887157-5');
	ReactGA.pageview('/homepage');
}
function Loading() {
	return (
		<div class="h-100 w-100 d-flex justify-content-center align-items-center">
			Loading...
		</div>
	);
}
const Page404 = React.lazy(() => import('./views/Pages/Page404'))
const Page500 = React.lazy(() => import('./views/Pages/Page500'))
const Home = React.lazy(() => import('./views/Pages/Home'))
const Dashboard = React.lazy(() => import('./containers/Dashboard'))

export default class App extends Component {
	render() {
		initializeReactGA();
		return (
			<BrowserRouter history={createBrowserHistory()} >
				<React.Suspense fallback={<Loading />}>
					<Switch>
						<Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
						<Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
						<Route exact path="/" name="Home" render={props => <Home {...props} />} />
						<Route path="/dashboard" name="Dashboard" render={props => <Dashboard {...props} />} />
						<Route component={Page404} name="Page 404" />
					</Switch>
					<ToastContainer autoClose={2000} />
				</React.Suspense>
			</BrowserRouter>
		);
	}
}
