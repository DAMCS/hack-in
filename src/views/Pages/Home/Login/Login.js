import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import "../../../../assets/css/dark.scss";

const MySwal = withReactContent(Swal);

const loading = () => (
	<div className="animated fadeIn pt-3 text-center">Loading...</div>
);

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
			url: "/user/login",
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
					<Form onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Control
								className="form-control"
								name="email"
								onChange={this.handleInput}
								value={this.state.email}
								type="email"
								placeholder="Enter email"
							/>
							<Form.Text className="text-muted">
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Control
								name="password"
								onChange={this.handleInput}
								value={this.state.password}
								type="password"
								placeholder="Password"
							/>
						</Form.Group>
						<Button type="submit">Submit</Button>
					</Form>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(Login);
