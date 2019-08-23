import React, { Component, useState } from "react";
import { Redirect, Switch, Route, withRouter } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

const loading = () => (
	<div className="animated fadeIn pt-3 text-center">Loading...</div>
);

function Example() {
	const [show, setShow] = useState(false);
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
  
	return (
	  <>
		<Button variant="primary" onClick={handleShow}>
		  Launch demo modal
		</Button>
  
		<Modal show={show} onHide={handleClose}>
		  <Modal.Header closeButton>
			<Modal.Title>Modal heading</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
		  <Modal.Footer>
			<Button variant="secondary" onClick={handleClose}>
			  Close
			</Button>
			<Button variant="primary" onClick={handleClose}>
			  Save Changes
			</Button>
		  </Modal.Footer>
		</Modal>
		{console.log("test")}
	  </>
	);
  }

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
					localStorage.setItem("token", response.data.token);
				}
			})
			.catch(error => {
				console.log(error.response);

				alert(error.response.data.message);

				// this.props.history.push("/404");
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
				<div>
					<Example />
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(Login);
