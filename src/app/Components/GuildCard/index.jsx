import React, { Component } from 'react';
import './style.css';
import { apiBase } from '../../../../config.json';
import fetch from 'node-fetch';
export default class guildcard extends Component {
	constructor(props) {
		super();
		this.props = props;
		this.state = {
			inGuild: false,
		};
	}

	async componentDidMount() {
		const res = await fetch(
			`${apiBase}/dashboard/checks/inguild?id=${this.props.guild.id}`
		).then((r) => r.json());
		if (res.inGuild) {
			this.setState({ inGuild: true });
		}
	}

	render() {
		const { guild } = this.props;
		return (
			<div className="GuildCard">
				<img
					className="GuildIcon"
					src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=1024`}
				/>
				<p className="GuildName">{guild.name}</p>
				{this.state.inGuild ? (
					<a href={`/dashboard?id=${guild.id}`}>
						<button className="DashboardGuildCard">
							Dashboard
						</button>
					</a>
				) : (
					<a
						href={`https://discord.com/oauth2/authorize?client_id=803853866277404683&scope=bot&permissions=403041398&guild_id=${guild.id}`}
					>
						<button className="AddToServerGuildCard">
							Add to Server
						</button>
					</a>
				)}
			</div>
		);
	}
}
