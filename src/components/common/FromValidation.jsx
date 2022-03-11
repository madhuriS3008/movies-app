import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";

class FormValidation extends Component {
  state = {
    data: {},
    errors: {},
  };

  formValidate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
    // const errors = {};
    // if (this.state.data.username.trim() === "")
    //   errors.username = "Username is required";
    // if (this.state.data.password.trim() === "")
    //   errors.password = "Password is required";
    // return Object.keys(errors).length === 0 ? {} : errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  submitHandler = (e) => {
    e.preventDefault();
    const errors = this.formValidate();

    this.setState({ errors: errors || {} });
    if (errors) return;
    this.loginSubmit();
  };

  changeHandler = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ data, errors });
  };
  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.changeHandler}
      />
    );
  };
  renderButton = (label) => {
    return (
      <button disabled={this.formValidate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
}

export default FormValidation;
