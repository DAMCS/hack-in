import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class Header extends Component {
	render() {
		return (
			<React.Fragment>
				<Container  >
					<Row>
						<Col>
							<h1>HACK[IN]</h1>
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		)
	}
}