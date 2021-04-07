import React from "react";
import "./style.css";
import Logo from "../../Assets/Logo.svg";

export default class Navigation extends React.Component {
  render() {
    return (
      <div className="NavigationBar">
        <Logo className="Logo" />
        <a className="NavLink" href="/">Home</a>
        <a className="NavLink" href="/commands">Commands</a>
        <a className="NavLink" href="/settings/dashboard">Dashboard</a>
        <a className="NavLink" href="http://discord.com/invite/kQUpSgw">Support</a>

        <button className="LoginButton">Login</button>
      </div>
    );
  }
}
