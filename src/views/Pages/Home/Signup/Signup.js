import React, { Component } from 'react';
import "../../../../css/style.css"

function Input(props) {
    return (
      <div class="ht-tm-element ht-tm-element-inner">
        <label>
          {props.placeholder}:<br />
          <input
            class="form-control"
            name={props.name}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            required={props.required}
          />
        </label>
      </div>
    );
  }
function Button(props) {
    return <input class={props.class} type={props.type} value={props.value} />;
}

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          firstName: "",
          lastName: "",
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
        event.preventDefault();
      }
    render() {
    return (
      <React.Fragment >
        <div className="animated fadeIn">
        <div class="card">
            <div class="card-body">
              <h1 class="card-title text-center">Sign Up</h1>
              <div class="ht-tm-codeblock ht-tm-btn-replaceable ht-tm-element ht-tm-element-inner">
                <form onSubmit={this.handleSubmit}>
                  <Input
                    type="text"
                    value={this.state.firstName}
                    onChange={this.handleInput}
                    name="firstName"
                    placeholder="First Name"
                    required={true}
                  />
                  <Input
                    type="text"
                    value={this.state.lastName}
                    onChange={this.handleInput}
                    name="lastName"
                    placeholder="Last Name"
                    required={true}
                  />
                  <Input
                    type="text"
                    value={this.state.userName}
                    onChange={this.handleInput}
                    name="userName"
                    placeholder="Username"
                    required={true}
                  />
                  <div class="ht-tm-element ht-tm-element-inner">
                    <input
                      type="radio"
                      value="Alumini"
                      checked={this.state.isAlumini === "Alumini"}
                      onChange={this.handleInput}
                      name="isAlumini"
                    />
                    Alumini &nbsp;&nbsp;
                    <input
                      type="radio"
                      value="Non-Alumini"
                      checked={this.state.isAlumini === "Non-Alumini"}
                      onChange={this.handleInput}
                      name="isAlumini"
                    />
                    Non-Alumini
                  </div>
                  <Input
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInput}
                    name="password"
                    placeholder="Password"
                    required={true}
                  />
                  <Input
                    type="password"
                    value={this.state.confirmPassword}
                    onChange={this.handleInput}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required={true}
                  />
                  <Button
                    class="btn btn-outline-success"
                    type="submit"
                    value="Sign Up"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}