import React, { Component } from 'react';
import { Container, NavLink } from 'reactstrap';

export default class Header extends Component {
	render() {
		return (
			<React.Fragment>
				<Container fluid className="d-flex justify-content-center mb-4">
					<h1>
						<NavLink href="/">
							HACK[IN]
						</NavLink>
					</h1>
				</Container>
			</React.Fragment>
		)
	}
}