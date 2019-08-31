import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { ToastContainer } from 'react-toastify'

import './App.scss';

function Loading() {
	return (
		<div class="d-flex justify-content-center align-items-center">
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
		return (
			<BrowserRouter history={createBrowserHistory()} >
				<React.Suspense fallback={<Loading />}>
					<Switch>
						<Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
						<Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
						<Route path="/dashboard" name="Dashboard" render={props => <Dashboard {...props} />} />
						<Route exact path="/" name="Home" render={props => <Home {...props} />} />
						<Redirect push from="/dashboard" to="/" />
					</Switch>
					<ToastContainer autoClose={2000} />
				</React.Suspense>
			</ BrowserRouter>
		);
	}
}
