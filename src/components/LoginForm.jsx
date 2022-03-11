import React, { Component } from "react";
import Input from "./common/Input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };
  //   username = React.createRef();
  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  submitHandler = (e) => {
    e.preventDefault();
    // const username = this.username.current.value;
    console.log("Submitted");
  };
  changeHandler = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  render() {
    const { account } = this.state;
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.submitHandler}>
          <Input
            type="text"
            name="username"
            label="Username"
            value={account.username}
            onChange={this.changeHandler}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            value={account.password}
            onChange={this.changeHandler}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
