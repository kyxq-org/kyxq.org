import React from "react";
import Wave from "../../Assets/Wave.svg";

import "./style.css";
export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div>
        <div className="LandingContent">
          <h1 className="LandingHeader">
            It's time to use kyxq in your server.
          </h1>
          <p className="LandingPar">
            kyxq is a multi-purpose bot designed to make servers more
            competitive.
          </p>
          <a href="getting-started">
            <button className="LandingButton orange-grad">Get Started</button>
          </a>
          <a href="https://discord.com/oauth2/authorize?client_id=803853866277404683&scope=bot&permissions=403041398">
            <button className="LandingButton off-black-grad">
              Add To Server
            </button>
          </a>
        </div>

        <Wave className="LandingWave" />
      </div>
    );
  }
}
