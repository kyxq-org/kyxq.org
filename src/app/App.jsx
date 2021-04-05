import React, { Component, lazy } from "react";
import { domain, apiBase } from "../../config.json";
import fetch from "node-fetch";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  render() {
    return <h1>test</h1>;
  }
}
