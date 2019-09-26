import React, { Component } from 'react';
import { Container, NavLink } from 'reactstrap';
import payoda from "./payoda.png"

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
					<div className="" style={{
						position: "fixed",
						top: 0,
						right: 0,
					}} >
						<img height="85px" width="260px" style={{cursor: "pointer"}} src={payoda} onClick={() => {window.open("https://www.payoda.com/")}}/>
					</div>
				</Container>
			</React.Fragment>
		)
	}
}