import React, { Component } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

export default class Header extends Component {
	render() {
		return (
			<React.Fragment>
					<Container>
						<h1>Hack[in]</h1>
					</Container>
			</React.Fragment>
		)
	}
}