import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { toast } from 'react-toastify'
import ReactGA from 'react-ga';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			isLoggedIn: false,
			msg: "",
			visible: true
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
		axios({
			method: "post",
			url: "/api/user/login",
			data: {
				email: this.state.email,
				password: this.state.password
			}
		})
			.then(response => {
				if (response.data.status === "Success") {
					toast.success("Signed in successfully");
					localStorage.setItem("token", response.data.token);
					ReactGA.event({
						category: 'User',
						action: 'User Logged In',
						time: new Date()
					});
					ReactGA.set({ userId: this.state.email });
					this.props.history.push('/dashboard');
				}
			})
			.catch(error => {
				toast.error("Failed to sign in!");
			});
		event.preventDefault();
	}
	render() {
		return (
			<React.Fragment>
				<div className="animated fadeIn">
					<Form onSubmit={this.handleSubmit} className="d-flex flex-column align-items-center">
						<FormGroup>
							<Input
								className="form-control"
								name="email"
								onChange={this.handleInput}
								value={this.state.email}
								type="email"
								placeholder="email"
								required
							/>
						</FormGroup>
						<FormGroup controlId="formBasicPassword">
							<Input
								name="password"
								onChange={this.handleInput}
								value={this.state.password}
								type="password"
								placeholder="password"
								required
							/>
						</FormGroup>
						<Button type="submit">Sign In</Button>
					</Form>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(Login);
