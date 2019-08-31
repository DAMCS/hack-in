import React, { Component } from "react";
import { Button, Form, FormText, FormGroup, Input } from "reactstrap";
import axios from "axios";
import { toast } from 'react-toastify';
import { withRouter } from "react-router-dom"
import ReactGA from 'react-ga';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			confirmPassword: "",
			phone: "",
			loginCode: ""
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
		let passCheck = /^[A-Za-z]\w{7,30}$/;
		if (!this.state.password.match(passCheck)) {
			toast.warn("Password dosent meet the requirements");
		} else if (this.state.password !== this.state.confirmPassword) {
			toast.warn("Password Mismatch");
		} else if (
			!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
				this.state.email
			)
		) {
			toast.error("Failed to sign up!");
		} else {
			axios({
				method: "post",
				url: "/api/user/signup",
				data: {
					loginCode: this.state.loginCode,
					email: this.state.email,
					password: this.state.password,
					confPassword: this.state.confirmPassword,
					phone: this.state.phone
				}
			})
				.then(response => {
					if (response.data.status === "Success") {
						toast.success("User created successfully")
						localStorage.setItem("token", response.data.token);
						ReactGA.event({
							category: 'User',
							action: 'Created an Account',
							time: new Date()
						});
						ReactGA.set({ userId: this.state.email });
						this.props.history.push("/dashboard");
						// this.props.onSubmitToggle();
					}
				})
				.catch(function (error) {
					toast.error("Failed to sign up!");
				});
		}
		event.preventDefault();
	}
	render() {
		return (
			<React.Fragment>
				<div className="animated fadeIn">
					<Form onSubmit={this.handleSubmit} className="d-flex flex-column align-items-center">
						<FormGroup controlId="formBasicEmail">
							<Input
								className="form-control"
								name="email"
								onChange={this.handleInput}
								value={this.state.email}
								type="email"
								placeholder="Enter email"
							/>
							{/* <FormText color="muted">
								You're information is kept secret!
							</FormText> */}
						</FormGroup>
						<FormGroup controlId="formBasicSignupPassword">
							<Input
								name="password"
								onChange={this.handleInput}
								value={this.state.password}
								type="password"
								placeholder="Password"
							/>
						</FormGroup>
						<FormGroup controlId="formBasicConfirmPassword">
							<Input
								name="confirmPassword"
								onChange={this.handleInput}
								value={this.state.confirmPassword}
								type="password"
								placeholder="Confirm Password"
							/>
						</FormGroup>
						<FormGroup controlId="formBasicPhone">
							<Input
								name="phone"
								onChange={this.handleInput}
								value={this.state.phone}
								type="text"
								placeholder="Phone Number"
							/>
						</FormGroup>
						<FormGroup controlId="formBasicLoginCode">
							<Input
								name="loginCode"
								onChange={this.handleInput}
								value={this.state.loginCode}
								type="text"
								placeholder="Login 2k19 Code"
							/>
						</FormGroup>
						<Button type="submit">Sign Up!</Button>
					</Form>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(SignUp) 