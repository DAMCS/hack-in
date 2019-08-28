import React, { Component } from "react";
import { Button, Form, FormText, FormGroup, Input } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export default class SignUp extends Component {
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
			MySwal.fire({
				type: "error",
				title: "Oops...",
				text: "Password dosent meet the requirements",
				toast: true
			});
		} else if (this.state.password !== this.state.confirmPassword) {
			MySwal.fire({
				type: "error",
				title: "Oops...",
				text: "Password Mismatch",
				toast: true
			});
		} else if (
			!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
				this.state.email
			)
		) {
			MySwal.fire({
				type: "error",
				title: "Oops...",
				text: "Invalid Email",
				toast: true
			});

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
						MySwal.fire({
							type: "success",
							title: "User created successfully",
							toast: true,
							position: "top-end",
							showConfirmButton: false,
							timer: 1000
						});
						localStorage.setItem("token", response.data.token);
						// this.props.history.push("/dashboard");
						this.props.onSubmitToggle();
					}
				})
				.catch(function (error) {
					MySwal.fire({
						type: "error",
						title: "Oops...",
						text: error.response.data.message,
						toast: false
					});
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
							<FormText color="muted">
								You're information will be kept a secret!
							</FormText>
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
