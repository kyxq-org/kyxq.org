import React, { Component, lazy } from 'react';
import { domain, apiBase } from '../../config.json';
import fetch from 'node-fetch';
import { Route, Switch } from 'react-router';
import Cookies from 'js-cookie';
import './style.css';

import Navigation from './Components/Navigation/navigation.jsx';

const Landing = React.lazy(() => import('./Pages/Landing/Landing.jsx'));
const Commands = React.lazy(() => import('./Pages/Commands/Commands.jsx'));
const Dashboard = React.lazy(() => import('./Pages/Dashboard/index.jsx'));

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
		};
	}

	async componentDidMount() {
		const access_token = Cookies.get('access_token');
		if (!access_token) return;
		var user = await fetch('https://discordapp.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}).then((r) => r.json());

		var guilds = await fetch(
			'https://discordapp.com/api/users/@me/guilds',
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		).then((r) => r.json());
		this.setState({ user: { ...user, guilds: guilds } });
	}

	render() {
		var { user } = this.state;
		window.sessionStorage.setItem("session", "test")
		return (
			<Switch>
				<React.Suspense fallback={<p>pls wait</p>}>
					<Navigation user={user} />
					<Route
						exact
						strict
						component={() => <Landing />}
						path="/"
					/>
					<Route path="/commands" component={() => <Commands />} />
					<Route
						path="/dashboard"
						component={() => <Dashboard user={user} />}
					/>
				</React.Suspense>
			</Switch>
		);
	}
}
