import React from "react";
import Wave from "../../Assets/Wave.svg";
import Navigation from "../../Components/Navigation/navigation.jsx";

import "./style.css";
export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div>
        <Navigation user={this.props.user} />

        <div className="LandingContent">
          <h1 className="LandingHeader">
            It's time to use kyxq in your server.
          </h1>
          <p className="LandingPar">
            kyxq is a multi-purpose bot designed to make servers more
            competitive.
          </p>
          <button className="LandingButton orange-grad">Get Started</button>
          <a href="https://discord.com/oauth2/authorize?client_id=803853866277404683&scope=bot&permissions=403041398"><button className="LandingButton off-black-grad">Add To Server</button></a>
        </div>

        <Wave className="LandingWave" />
      </div>
    );
  }
}
