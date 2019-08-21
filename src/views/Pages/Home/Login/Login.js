import React, { Component } from 'react';
import { Card } from 'react-bootstrap'

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			password: "",
			confirmPassword: ""
		};
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleInput(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}
	handleSubmit(event) {
		if (this.state.password !== this.state.confirmPassword) {
			alert("Password Mismatch");
		} else if (
			!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.userName)
		) {
			alert("Invalid Email");
		} else {
			alert("Success");
		}
		event.preventDefault();
	}
	render() {
		return (
			<React.Fragment >
				<div className="animated fadeIn">
					<Card>
						<Card.Title>
							Login
						</Card.Title>
						<Card.Body>

						</Card.Body>
					</Card>
				</div>
			</React.Fragment>
		)
	}
}