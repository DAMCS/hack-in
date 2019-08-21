import React, { Component } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

export default class Header extends Component {
	render() {
		return (
			<React.Fragment>
				<Jumbotron fluid>
					<Container>
						<h1>Hack[in] 2019</h1>
						<p>Wow this beautiful</p>
					</Container>
				</Jumbotron>
			</React.Fragment>
		)
	}
}