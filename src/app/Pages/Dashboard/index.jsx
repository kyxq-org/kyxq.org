import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { apiBase } from '../../../../config.json';
import GuildCard from '../../Components/GuildCard/index.jsx';
import './style.css';
import './guildSettings.css';
import GuildSettings from './guildSettings.jsx';
// cards

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
				tab: 'home',
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
							{this.state.user.guilds.length >= 1 ? (
								[...this.state.user.guilds]
									.filter(
										(f) =>
											f.owner ||
											(f.permissions & 0x000000020) ==
												0x000000020
									)
									.map((f) => (
										<GuildCard key={f.id} guild={f} />
									))
							) : (
								<p style={{ textAlign: 'center' }}>
									You arn't in any guilds
								</p>
							)}
						</div>
					</div>
				);
			} else {
				if (!this.state.user.guilds) return <h1>pls wait</h1>;
				var guild = [...this.state.user.guilds].filter(
					(f) => f.id === this.state.guildID
				)[0];
				if (
					this.state.user === null ||
					!(guild.permissions & 0x000000020) == 0x000000020
				) {
					window.location.href = '/dashboard';
				}
				return (
					<div className="MainBox">
						<div className="Sidebar">
							<p
								className="SidebarTabOption"
								onClick={() => this.setState({ tab: 'home' })}
							>
								Settings
							</p>
							<p
								className="SidebarTabOption"
								onClick={() =>
									this.setState({ tab: 'automod' })
								}
							>
								Auto Mod Settings
							</p>
							<p
								className="SidebarTabOption"
								onClick={() =>
									this.setState({ tab: 'messages' })
								}
							>
								Join/Leave Settings
							</p>
						</div>

						<div className="GuildSettingsPane">
							<GuildSettings
								tab={this.state.tab}
								guildSettings={this.state.guildSettings}
								guildID={this.state.guildID}
							/>
						</div>
					</div>
				);
			}
		}
	}
);
