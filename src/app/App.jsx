import React, { Component, lazy } from "react";
import { domain, apiBase } from "../../config.json";
import fetch from "node-fetch";
import { Route, Switch } from "react-router";

import "./style.css";

const Landing = React.lazy(() => import("./Pages/Landing/Landing.jsx"));

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
          <Route exact strict component={() => <Landing />} path="/" />
        </React.Suspense>
      </Switch>
    );
  }
}
