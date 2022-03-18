import React from "react";
import Joi from "joi-browser";
import FormValidation from "./common/FromValidation";
import { register } from "./../services/userService";

class RegisterForm extends FormValidation {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().label("Email Address").required(),
    password: Joi.string().min(6).label("Password").required(),
    name: Joi.string().min(3).required(),
  };

  formSubmit = async () => {
    try {
      const response = await register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      // this.props.history.push("/");
      window.location = "/";
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = e.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <>
        <h1>Registration Form</h1>
        <form onSubmit={this.submitHandler}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </>
    );
  }
}

export default RegisterForm;
