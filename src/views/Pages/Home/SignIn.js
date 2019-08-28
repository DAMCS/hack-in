import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import "../../../assets/css/dark.scss";

const MySwal = withReactContent(Swal);

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

					MySwal.fire({
						type: 'success',
						title: 'Signed in successfully',
						toast: true,
						position: 'top-end',
						showConfirmButton: false,
						timer: 1000
					})
					localStorage.setItem("token", response.data.token);
					this.props.history.push('/dashboard');
				}
			})
			.catch(error => {
				MySwal.fire({
					type: 'error',
					title: 'Oops...',
					text: error.response.data.message,
					toast: false,
				})
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
								placeholder="Enter email"
							/>
						</FormGroup>
						<FormGroup controlId="formBasicPassword">
							<Input
								name="password"
								onChange={this.handleInput}
								value={this.state.password}
								type="password"
								placeholder="Password"
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
