import React, { Component } from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			password: "",
			isLoggedIn:false,
			msg:""
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
			method: 'post',
			url: 'http://13.235.77.118:3000/user/login',
			data: {
				"email": this.state.userName,
				"password": this.state.password
			}
			}).then(response => {
				let x = response.data.status;
				
				if (response.data.status === "Success") {
					console.log(x);
					this.setState({
						isLoggedIn:true
					})
				}
			})
			.catch(error => {
				this.setState({
					msg: error.response.data.message
				})
			})
		event.preventDefault();
	}
	render() {
		return (
			<React.Fragment >
        		<div className="animated fadeIn">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group >
                    <Form.Control className="form-control" name="userName" onChange={this.handleInput} value={this.state.userName} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control name="password" onChange={this.handleInput} value={this.state.password} type="password" placeholder="Password" />
                  </Form.Group>
                  <Button type="submit">
                    Submit
                  </Button>
                </Form>
					{this.state.isLoggedIn ? <React.Suspense fallback={loading()}>
						<Switch>
							<Redirect to='/dashboard' />
						</Switch>
					</React.Suspense> : <div>
						{this.state.msg}
  					<Redirect to='/' /></div>}
              </div>
      		</React.Fragment>
		)
	}
}