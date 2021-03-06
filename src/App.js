import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { ToastContainer } from 'react-toastify'
import './App.scss';
import ReactGA from 'react-ga';
import Loading from './components/Loading/Loading.js';

function initializeReactGA() {
	ReactGA.initialize(process.env.REACT_APP_GA_ID);
	ReactGA.pageview('/homepage');
}

const Page404 = React.lazy(() => import('./views/Pages/Page404'))
const Page500 = React.lazy(() => import('./views/Pages/Page500'))
const Home = React.lazy(() => import('./views/Pages/Home'))
const Dashboard = React.lazy(() => import('./containers/Dashboard'))
const EndingPage = React.lazy(() => import('./views/Pages/BubyePage'))

export default class App extends Component {
	render() {
		initializeReactGA();
		return (
			<BrowserRouter history={createBrowserHistory()} >
				<React.Suspense fallback={<Loading />}>
					<Switch>
						<Route exact path="/endingpage" name="Ending Page" render={props => <EndingPage {...props} />} />
						<Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
						<Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
						<Route exact path="/" name="Home" render={props => <Home {...props} />} />
						<Route path="/dashboard" name="Dashboard" render={props => <Dashboard {...props} />} />
						<Route component={Page404} name="Page 404" />
					</Switch>
					<ToastContainer autoClose={2000} class="" hideProgressBar={false} />
				</React.Suspense>
			</BrowserRouter>
		);
	}
}
