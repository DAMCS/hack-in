import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

export default class Header extends Component {
	render() {
		return (
			<React.Fragment>
				<Jumbotron fluid>
					<h1>Hack[in] 2019</h1>
					<p>Wow this beautiful</p>
				</Jumbotron>
			</React.Fragment>
		)
	}
}