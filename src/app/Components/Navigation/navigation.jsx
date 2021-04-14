import React, { useLayoutEffect } from 'react';
import './style.css';
import Logo from '../../Assets/Logo.svg';

export default class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}
	render() {
		var { user } = this.props;
		console.log(user);
		return (
			<div className="NavigationBar">
				<Logo className="Logo" />
				<a className="NavLink" href="/">
					Home
				</a>
				<a className="NavLink" href="/commands">
					Commands
				</a>
				<a className="NavLink" href="/dashboard">
					Dashboard
				</a>
				<a className="NavLink" href="http://discord.com/invite/kQUpSgw">
					Support
				</a>
				<div className="UserNavDiv">
					{!user ? (
						<a href="/api/discord/login">
							<button className="LoginButton">Login</button>
						</a>
					) : (
						<div>
							<img
								className="UserNavImage"
								src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
							/>
							<p className="UserNavHello">
								Hello,{' '}
								<span className="UserNavName">
									{user.username}
								</span>
							</p>
						</div>
					)}
				</div>
			</div>
		);
	}
}
