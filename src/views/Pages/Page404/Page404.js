import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';

class Page404 extends Component {
	render() {
		return (
			<Container className="h-100 w-100 d-flex justify-content-center align-items-center">
				<Row className="justify-content-center">
					<Col xs="12">
						<div className="clearfix">
							<h1 className="float-left display-3 mr-4">404</h1>
							<h4 className="pt-3">Oops! You're lost.</h4>
							<p className="float-left">The page you are looking for was not found.</p>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Page404;
