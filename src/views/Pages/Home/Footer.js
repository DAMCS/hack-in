import React, { Component } from "react";
import "../../../assets/css/footer.css";
import { Container, Row, Col } from "reactstrap";

export default class Footer extends Component {
	render() {
		return (
			<React.Fragment>
				<link
					href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
					rel="stylesheet"
				/>
				<Container fluid>
					<Row>
						<Col sm='12' md="6">
							Login 2K19, PSG College of Technology.
								</Col>
					</Row>
				</Container>
			</React.Fragment>
		);
	}
}
