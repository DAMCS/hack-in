import React, { Component } from "react";
import { Button, Form, FormGroup, Input, ButtonGroup } from "reactstrap";
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
			loginCode: "",
			signupType: true,
			uname: "",
			roll_no: "",
			alumni_code: "",
		};
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSignupType = this.handleSignupType.bind(this);
	}
	render() {
		return (
			<React.Fragment>
				<div className="animated fadeIn">
					<ButtonGroup className="p-2 d-flex justify-content-center">
						<Button name="student" onClick={this.handleSignupType} disabled={this.state.signupType === true}>
							Student
						</Button>
						<Button name="alumni" onClick={this.handleSignupType} disabled={this.state.signupType === false}>
							Alumnus
						</Button>
					</ButtonGroup>
					{this.state.signupType ? (
						<Form name="student" onSubmit={this.handleSubmit} className="d-flex flex-column align-items-center">
							<FormGroup controlId="formBasicEmail">
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
							<FormGroup controlId="formBasicSignupPassword">
								<Input
									name="password"
									onChange={this.handleInput}
									value={this.state.password}
									type="password"
									placeholder="password"
									required
								/>
							</FormGroup>
							<FormGroup controlId="formBasicConfirmPassword">
								<Input
									name="confirmPassword"
									onChange={this.handleInput}
									value={this.state.confirmPassword}
									type="password"
									placeholder="confirm password"
									required
								/>
							</FormGroup>
							<FormGroup controlId="formBasicPhone">
								<Input
									name="phone"
									onChange={this.handleInput}
									value={this.state.phone}
									type="text"
									placeholder="phone number"
									required
								/>
							</FormGroup>
							<FormGroup controlId="formBasicLoginCode">
								<Input
									name="loginCode"
									onChange={this.handleInput}
									value={this.state.loginCode}
									type="text"
									placeholder="login 2k19 code"
									required
								/>
							</FormGroup>
							<Button type="submit">Sign Up!</Button>
						</Form>
					) : (
							<Form name="alumni" onSubmit={this.handleSubmit} className="d-flex flex-column align-items-center">
								<FormGroup controlId="formName">
									<Input
										className="form-control"
										name="uname"
										onChange={this.handleInput}
										value={this.state.uname}
										type="text"
										placeholder="name"
										required
									/>
								</FormGroup>
								<FormGroup controlId="formRollNo">
									<Input
										className="form-control"
										name="roll_no"
										onChange={this.handleInput}
										value={this.state.roll_no}
										type="text"
										placeholder="roll number"
										required
									/>
								</FormGroup>
								<FormGroup controlId="formBasicEmail">
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
								<FormGroup controlId="formBasicSignupPassword">
									<Input
										name="password"
										onChange={this.handleInput}
										value={this.state.password}
										type="password"
										placeholder="password"
										required
									/>
								</FormGroup>
								<FormGroup controlId="formBasicConfirmPassword">
									<Input
										name="confirmPassword"
										onChange={this.handleInput}
										value={this.state.confirmPassword}
										type="password"
										placeholder="confirm password"
										required
									/>
								</FormGroup>
								<FormGroup controlId="formBasicPhone">
									<Input
										name="phone"
										onChange={this.handleInput}
										value={this.state.phone}
										type="text"
										placeholder="phone number"
										required
									/>
								</FormGroup>
								<FormGroup controlId="formBasicLoginCode">
									<Input
										name="alumni_code"
										onChange={this.handleInput}
										value={this.state.alumni_code}
										type="text"
										placeholder="alumni code"
										required
									/>
								</FormGroup>
								<Button type="submit">Sign Up!</Button>
							</Form>
						)
					}
				</div>
			</React.Fragment>
		);
	}

	handleSignupType(event) {
		this.setState({
			email: "",
			password: "",
			confirmPassword: "",
			phone: "",
			loginCode: "",
			uname: "",
			roll_no: "",
			alumni_code: "",
		})
		if (event.target.name === "alumni") {
			this.setState({
				signupType: false,
			})
		}
		else {
			this.setState({
				signupType: true,
			})
		}

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
		let passCheck = /^[A-Za-z0-9]\w{7,30}$/;
		console.log(event.target.name);
		if (event.target.name === "student") {

			if (!this.state.password.match(passCheck)) {
				toast.warn("Password should be a combination of letters and numbers greater than 7 characters!");
			} else if (this.state.password !== this.state.confirmPassword) {
				toast.warn("Password Mismatch");
			} else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
				toast.warn("Invalid e-mail id!");
			} else if (this.state.phone.length !== 10) {
				toast.warn("Invalid phone number!");
			} else {
				axios({
					method: "post",
					url: "/api/user/signup",
					data: {
						loginCode: this.state.loginCode,
						email: this.state.email,
						password: this.state.password,
						confPassword: this.state.confirmPassword,
						phone: this.state.phone,
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
						}
					})
					.catch((err) => {
						 if(err.response.data.status === "Error")
							toast.error(err.response.data.message);
					});
			}
		}
		else if (event.target.name === "alumni") {
			if (!this.state.password.match(passCheck)) {
				toast.warn("Password should be a combination of letters and numbers greater than 7 characters!");
			} else if (this.state.password !== this.state.confirmPassword) {
				toast.warn("Password Mismatch");
			} else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
				toast.warn("Invalid e-mail id!");
			} else if (this.state.phone.length !== 10) {
				toast.warn("Invalid phone number!");
			} else {
				axios({
					method: "post",
					url: "/api/user/signup/alum",
					data: {
						name: this.state.uname,
						rollno: this.state.roll_no,
						email: this.state.email,
						password: this.state.password,
						confPassword: this.state.confirmPassword,
						phone: this.state.phone,
						alumCode: this.state.alumni_code,
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
						}
					})
					.catch((err) => {
						if (err.response.data.status === "Error")
							toast.error(err.response.data.message);
					});
			}
		}
		event.preventDefault();
	}
}

export default withRouter(SignUp) 