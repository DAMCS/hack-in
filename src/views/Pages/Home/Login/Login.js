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
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      confirmPassword: ""
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
    if (this.state.password !== this.state.confirmPassword) {
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
        <div class="card-body ht-tm-superspecialcardcheat">
          <h1 class="card-title text-center">Sign In</h1>
          <div class="ht-tm-codeblock ht-tm-btn-replaceable">
            <form onSubmit={this.handleSubmit}>
              <Input
                type="text"
                value={this.state.userName}
                onChange={this.handleInput}
                name="userName"
                placeholder="Username"
                required={true}
              />
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
                value="Sign In"
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