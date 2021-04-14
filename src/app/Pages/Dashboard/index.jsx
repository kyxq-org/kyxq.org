import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { apiBase } from '../../../../config.json';
import GuildCard from '../../Components/GuildCard/index.jsx';
import './style.css';

// cards
import SettingsCard from '../../Components/DashboardSettingsCard/index.jsx';
import MessageCard from '../../Components/DashboardMessageCard/index.jsx';
export default withRouter(
	class dashboard extends Component {
		constructor(props) {
			super(props);
			this.props = props;
			this.state = {
				user: props.user,
				userLoaded: false,
				guildSettings: null,
				guildID: !props.location.search.match(/(\d+)/)
					? null
					: props.location.search.match(/(\d+)/)[0],
			};
		}

		async componentDidMount() {
			if (!this.props.user) {
				this.state.userLoaded = false;
			} else {
				this.state.userLoaded = true;
			}
			if (!this.state.guildID) {
			} else {
				var settings = await this.fetchSettings(this.state.guildID);
				this.state.guildSettings = settings;
			}

			this.forceUpdate();
		}

		async fetchSettings(guildID) {
			var settings = await fetch(
				`${apiBase}/dashboard/grabsettings?id=${guildID}`
			).then((r) => r.json());
			return settings;
		}

		async updateToggleable(name, value) {}

		render() {
			if (this.state.userLoaded === false)
				return <h1>pls wait... loading</h1>;
			var guildID = this.props.location.search.match(/(\d+)/);

			if (!guildID) {
				return (
					<div>
						<div className="GuildSelection">
							{[...this.state.user.guilds]
								.filter((f) => f.owner)
								.map((f) => (
									<GuildCard guild={f} />
								))}
						</div>
					</div>
				);
			} else {
				var guild = [...this.state.user.guilds].filter(
					(f) => f.id === this.state.guildID
				)[0];
				if (this.state.user === null || !guild.owner) {
					window.location.href = '/';
				}
				return (
					<div className="GuildSettings">
						<p className="SettingsHeader">
							{guild.name}'s Settings
						</p>
						<div className="SettingsSection">
							<p className="SettingsHeaderMini">
								General Settings
							</p>
							<div className="SettingsCards">
								<SettingsCard
									header="prefix"
									currentState={
										this.state.guildSettings.prefix
									}
									desc="The bots prefix"
									id="prefix"
								/>
							</div>

							<p className="SettingsHeaderMini">
								Join/Leave Messages
							</p>
							<div className="SettingsCards">
								<MessageCard
									header="join"
									currentState={
										this.state.guildSettings.messages
											.welcome
									}
									desc="The message sent when a user joins the guild"
									id="welcomemsg"
								/>
								<MessageCard
									header="leave"
									currentState={
										this.state.guildSettings.messages.leave
									}
									desc="The message sent when a user leaves the guild"
									id="leavemsg"
								/>
							</div>
						</div>
					</div>
				);
			}
		}
	}
);
