import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default class Header extends Component {
	render() {
		return (
			<React.Fragment>
				<Container fluid >
					<Row>
						<Col className="d-flex justify-content-center">
							<h1>HACK[IN]</h1>
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		)
	}
}