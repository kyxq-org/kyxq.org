import React from "react";
import CommandsJson from "./commands.json";
import CommandCard from "../../Components/CommandCard/CommandCard.jsx";
import "./style.css";
export default class Commands extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: "all",
    };
  }
  render() {
    var groups = [];
    for (var i of Object.entries(CommandsJson)) {
      if (!groups.includes(i[1].help.category)) {
        groups.push(i[1].help.category.toLowerCase());
      }
    }
    return (
      <div style={{ marginTop: "50px" }}>
        <div className="categorySelector">
          <button
            className="CommandCategoryBtn pink-grad"
            onClick={() => this.setState({ selected: "all" })}
          >
            All ({Object.entries(CommandsJson).length})
          </button>

          {groups.map((f) => (
            <button
              className="CommandCategoryBtn"
              onClick={() => this.setState({ selected: f })}
            >
              {f.split("")[0].toUpperCase() + f.split("").slice(1).join("")} (
              {
                Object.entries(CommandsJson).filter(
                  (s) => s[1].help.category === f
                ).length
              }
              )
            </button>
          ))}
          {/* <button
            className="CommandCategoryBtn green-blue-grad"
            onClick={() => this.setState({ selected: "currency" })}
          >
            Currency
          </button>
          <button
            className="CommandCategoryBtn pink-blue-grad"
            onClick={() => this.setState({ selected: "fun" })}
          >
            Fun
          </button>
          <button
            className="CommandCategoryBtn information-grad"
            onClick={() => this.setState({ selected: "information" })}
          >
            Information
          </button>
          <button
            className="CommandCategoryBtn levels-grad"
            onClick={() => this.setState({ selected: "levels" })}
          >
            Levels
          </button>
          <button
            className="CommandCategoryBtn mod-grad"
            onClick={() => this.setState({ selected: "moderation" })}
          >
            Moderation
          </button>
          <button
            className="CommandCategoryBtn dev-grad"
            onClick={() => this.setState({ selected: "developer" })}
          >
            Developer
          </button> */}
        </div>
        <div className="Commands">
          {Object.entries(CommandsJson)
            .filter((f) =>
              this.state.selected === "all"
                ? f
                : f[1].help.category === this.state.selected
            )
            .map((f) => (
              <CommandCard cmd={f[1]} currentlySelected={this.state.selected} />
            ))}
        </div>
      </div>
    );
  }
}
