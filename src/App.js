import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Customers from "./components/Customers";
import Movies from "./components/Movies";
import Rentals from "./components/Rentals";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import MovieForm from "./components/MovieForm";

class App extends Component {
  state = {};

  render() {
    return (
      <>
        <header>
          <Navbar />
        </header>
        <main className="container mt-3">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
