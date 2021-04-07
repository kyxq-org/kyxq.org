import React from "react";

import "./style.css";
export default class CommandCard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const {
      cmd: { help, config },
    } = this.props;
    return (
      <div className="CommandCard" id={help.name}>
        <h1 className="CommandName">
          {help.name}{" "}
          {config.aliases.length >= 1 ? (
            <span className="aliases">
              <span className="CommandsBar">|</span> (
              {config.aliases.join(", ")})
            </span>
          ) : null}
        </h1>
        <p className="CommandDetails">
          <span className="CommandDetailsTitle">Description:</span>{" "}
          {help.description}
        </p>
        <p className="CommandDetails">
          <span className="CommandDetailsTitle">Usage:</span>{" "}
          {help.usage.replace("{c}", help.name)}
        </p>
      </div>
    );
  }
}
