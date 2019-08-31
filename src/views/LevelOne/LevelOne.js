import React, { Component } from 'react';
import ReactGA from 'react-ga';

function initializeReactGA() {
	ReactGA.initialize('UA-104887157-5');
	ReactGA.pageview('/levelone');
}

export default class LevelOne extends Component {
	render() {
		initializeReactGA();
		return (
			<React.Fragment >

			</React.Fragment>
		)
	}
}