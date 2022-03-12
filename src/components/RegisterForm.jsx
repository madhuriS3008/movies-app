import React from "react";
import Joi from "joi-browser";
import FormValidation from "./common/FromValidation";

class RegisterForm extends FormValidation {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().email().label("Email Address").required(),
    password: Joi.string().min(7).label("Password").required(),
    name: Joi.string().min(3).required(),
  };
  formSubmit = () => {
    console.log("Registration Form submitted");
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
