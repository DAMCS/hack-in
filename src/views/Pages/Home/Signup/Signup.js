import React, { Component } from 'react';
import {Button , Form, Alert} from "react-bootstrap";
import axios from 'axios';
import { Redirect,Switch } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userName: "",
          password: "",
          confirmPassword: "",
          phone: "",
          loginCode: "",
          isAuthSuccess:false,
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
        let passCheck = /^[A-Za-z]\w{7,14}$/;
        if (!this.state.password.match(passCheck)) {
          this.setState({ msg: "Password dose not meet the requirements" });
        } else if (this.state.password !== this.state.confirmPassword) {
          this.setState({ msg: "Password Mismatch" });
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.userName)) {
            this.setState({msg:"Invalid Email"});
        } else{
            axios({
              method: 'post',
              url: 'http://13.235.77.118:3000/user/signup',
              data: {
                "loginCode": this.state.loginCode,
                "email": this.state.userName,
                "password": this.state.password,
                "confPassword": this.state.confirmPassword,
                "phone": this.state.phone
              }
            }).then(response => {
              let x = response.data.status;

              if (response.data.status === "Success") {
                console.log(x);
                this.setState({
                  isAuthSuccess: true
                })
              }
              })
              .catch(error => {
                console.log(error.response.data)
                this.setState({
                  msg: error.response.data.message
                })
              })
        }
        event.preventDefault();
      }
    render() {
    return (
      <React.Fragment >
        <div className="animated fadeIn">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group  controlId="formBasicEmail">
                    <Form.Control className="form-control" name="userName" onChange={this.handleInput} value={this.state.userName} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control name="password" onChange={this.handleInput} value={this.state.password} type="password" placeholder="Password" />
                    <Form.Text className="text-muted">
                      Requirements: Must contain a capital letter and a number.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Control name="confirmPassword" onChange={this.handleInput} value={this.state.confirmPassword} type="password" placeholder="Confirm Password" />
                  </Form.Group>
                  <Form.Group controlId="formBasicPhone">
                    <Form.Control name="phone" onChange={this.handleInput} value={this.state.phone} type="text" placeholder="Phone Number" />
                  </Form.Group>
                  <Form.Group controlId="formBasicLoginCode">
                    <Form.Control name="loginCode" onChange={this.handleInput} value={this.state.loginCode} type="text" placeholder="LoginCode" />
                  </Form.Group>
                  {/* <Form.Group controlId="formBasicAlumini">
                    <Form.Check name="isAlumini" value="Non-Alumini" inline label="Non-Alumini" checked={this.state.isAlumini === "Non-Alumini"} onChange={this.handleInput} type="radio" id={`inline-radio-1`} />
                    <Form.Check value="Alumini" inline label="Alumini" checked={this.state.isAlumini === "Alumini"} onChange={this.handleInput} name="isAlumini" type="radio" id={`inline-radio-2`} />
                  </Form.Group> */}
                  <Button type="submit">
                    Submit
                  </Button>
                </Form>
                {this.state.isAuthSuccess ? <React.Suspense fallback={loading()}>
                  <Switch>
                    {window.location.reload()}
                    <Redirect to='/' />
                  </Switch>
                </React.Suspense> : <div>
                    {this.state.msg}
                    <Redirect to='/' /></div>}
              </div>
      </React.Fragment>
    );
  }
}