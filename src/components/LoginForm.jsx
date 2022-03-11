import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/Input";
import FormValidation from "./common/FromValidation";

class LoginForm extends FormValidation {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  //   username = React.createRef();
  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  loginSubmit = () => {
    // const username = this.username.current.value;
    console.log("Submitted");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.submitHandler}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
