import React, { Component } from 'react';
import {Button , Form} from "react-bootstrap";
import axios from 'axios';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userName: "",
          password: "",
          confirmPassword: "",
          isAlumini: "Non-Alumini"
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
          alert("Password dosent meet the requirements");
        } else if (this.state.password !== this.state.confirmPassword) {
          alert("Password Mismatch");
        } else if (
          !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.userName)
        ) {
          alert("Invalid Email");
        } else {
          alert("Success");
        }
        const data = {
          "loginCode": "10922",
          "email": this.state.userName,
          "password": this.state.password,
          "confPassword": this.state.confirmPassword,
          "phone": "9942765213"
        };
        axios({
          method: 'post',
          url: '/user/signup',
          data: {
            "loginCode": "10922",
            "email": this.state.userName,
            "password": this.state.password,
            "confPassword": this.state.confirmPassword,
            "phone": "9942765213"
          }
          }).then(response => {
          console.log(response.data)
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
                  <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Control name="confirmPassword" onChange={this.handleInput} value={this.state.confirmPassword} type="password" placeholder="Confirm Password" />
                  </Form.Group>
                  <Form.Group controlId="formBasicAlumini">
                    <Form.Check name="isAlumini" value="Non-Alumini" inline label="Non-Alumini" checked={this.state.isAlumini === "Non-Alumini"} onChange={this.handleInput} type="radio" id={`inline-radio-1`} />
                    <Form.Check value="Alumini" inline label="Alumini" checked={this.state.isAlumini === "Alumini"} onChange={this.handleInput} name="isAlumini" type="radio" id={`inline-radio-2`} />
                  </Form.Group>
                  <Button type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
      </React.Fragment>
    )
  }
}