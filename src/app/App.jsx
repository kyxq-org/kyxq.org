import React, { Component, lazy } from "react";
import { domain, apiBase } from "../../config.json";
import fetch from "node-fetch";
import { Route, Switch } from "react-router";

import "./style.css";

import Navigation from "./Components/Navigation/navigation.jsx";

const Landing = React.lazy(() => import("./Pages/Landing/Landing.jsx"));
const Commands = React.lazy(() => import("./Pages/Commands/Commands.jsx"));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  render() {
    return (
      <Switch>
        <React.Suspense fallback={<p>pls wait</p>}>
          <Navigation />
          <Route exact strict component={() => <Landing />} path="/" />
          <Route path="/commands" component={() => <Commands />} />
        </React.Suspense>
      </Switch>
    );
  }
}
