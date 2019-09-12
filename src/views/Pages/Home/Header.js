import React, { Component } from 'react';
import { Container, NavLink } from 'reactstrap';

export default class Header extends Component {
	render() {
		return (
			<React.Fragment>
				<Container fluid className="h-100 d-flex justify-content-center mt-auto">
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