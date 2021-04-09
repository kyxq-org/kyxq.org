import React from "react";

import "./style.css";
export default class CommandCard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      style: "",
    };
  }

  componentDidMount() {
    // if (
    //   document.getElementById(`description-${this.props.cmd.help.name}`)
    //     .offsetHeight >= 19
    // ) {
    //   document.getElementById(`${this.props.cmd.help.name}`).style.height =
    //     95 + 15 + "px";
    // }
  }

  render() {
    const {
      cmd: { help, config },
      currentlySelected,
    } = this.props;
    return (
      <div
        className={`CommandCard ${
          currentlySelected === "all" ? "CommandCardBig" : null
        }`}
        id={help.name}
      >
        <h1 className="CommandName">
          {help.name}{" "}
          {config.aliases.length >= 1 ? (
            <span className="aliases">
              <span className="CommandsBar">|</span> (
              {config.aliases.join(", ")})
            </span>
          ) : null}
        </h1>
        <p className="CommandDetails" id={`description-${help.name}`}>
          <span className="CommandDetailsTitle">Description:</span>{" "}
          {help.description}
        </p>
        <p className="CommandDetails">
          <span className="CommandDetailsTitle">Usage:</span>{" "}
          {help.usage.replace("{c}", help.name).split(" ")[0]}{" "}
          <span className="arguments">
            {help.usage.split(" ").slice(1).join(" ").replaceAll("`", "")}
          </span>
        </p>
        {currentlySelected === "all" ? (
          <p className="CommandDetails">
            <span className="CommandDetailsTitle">Category: </span>
            {help.category}
          </p>
        ) : null}
      </div>
    );
  }
}
