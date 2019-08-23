import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default class Footer extends Component {
	render() {
		return (
			<React.Fragment>
				<Container style={{position: "fixed", bottom: "0px"}}>
					Login 2019, PSG College of Technology
				</Container>
			</React.Fragment >
		)
	}
}