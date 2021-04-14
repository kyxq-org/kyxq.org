import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { apiBase } from '../../../../config.json';
import GuildCard from '../../Components/GuildCard/index.jsx';
import './style.css';
import './guildSettings.css';

// cards
import SettingsCard from '../../Components/DashboardSettingsCard/index.jsx';
import MessageCard from '../../Components/DashboardMessageCard/index.jsx';
import SwitchCard from '../../Components/DashboardSwitchCard/index.jsx';
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
							{[...this.state.user.guilds]
								.filter(
									(f) =>
										f.owner ||
										(f.permissions & 0x000000020) ==
											0x000000020
								)
								.map((f) => (
									<GuildCard guild={f} />
								))}
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
							{this.projector()}
						</div>
					</div>
					// <div className="GuildSettings">
					// 	<p className="SettingsHeader">
					// 		{guild.name}'s Settings
					// 	</p>
					// 	<div className="SettingsSection">
					// 		<p className="SettingsHeaderMini">
					// 			General Settings
					// 		</p>
					// 		<div className="SettingsCards">
					// 			<SettingsCard
					// 				header="prefix"
					// 				currentState={
					// 					this.state.guildSettings.prefix
					// 				}
					// 				desc="The bots prefix"
					// 				id="prefix"
					// 			/>
					// 		</div>

					// 		<p className="SettingsHeaderMini">
					// 			Join/Leave Messages
					// 		</p>
					// 		<div className="SettingsCards">
					// 			<MessageCard
					// 				header="join"
					// 				currentState={
					// 					this.state.guildSettings.messages
					// 						.welcome
					// 				}
					// 				desc="The message sent when a user joins the guild"
					// 				id="welcomemsg"
					// 			/>
					// 			<MessageCard
					// 				header="leave"
					// 				currentState={
					// 					this.state.guildSettings.messages.leave
					// 				}
					// 				desc="The message sent when a user leaves the guild"
					// 				id="leavemsg"
					// 			/>
					// 		</div>
					// 	</div>
					// </div>
				);
			}
		}

		projector() {
			switch (this.state.tab) {
				case 'home':
					return this.renderHome();
				case 'automod':
					return this.renderAutomod();
				case 'messages':
					return this.renderJoinLeave();

				default:
					return <h1>This isnt a valid menu item</h1>;
			}
		}

		renderHome() {
			return (
				<div className="Flexbox-Dash">
					<SettingsCard
						header="prefix"
						currentState={this.state.guildSettings.prefix}
						desc="The bots prefix"
						id="prefix"
					/>
				</div>
			);
		}

		renderJoinLeave() {
			return <h1>Join leave components</h1>;
		}

		renderAutomod() {
			return (
				<div className="Flexbox-Dash">
					<SwitchCard
						name="All Caps"
						description="The bot will delete all messages with over 75% capital letters."
						enabled={
							this.state.guildSettings.switches.automod.allCaps
						}
					/>
					<SwitchCard
						name="All Links"
						description="The bot will delete all links sent in a channel."
						enabled={
							this.state.guildSettings.switches.automod.allLinks
						}
					/>
					<SwitchCard
						name="Duplicate Text"
						description="The bot will delete duplicated text."
						enabled={
							this.state.guildSettings.switches.automod
								.duplicateText
						}
					/>
					<SwitchCard
						name="Fast Messages"
						description="The bot will delete messages being spammed (by the same user)."
						enabled={
							this.state.guildSettings.switches.automod.fastmsg
						}
					/>
					<SwitchCard
						name="Image Spam"
						description="The bot will delete images that are being sent multiple times."
						enabled={
							this.state.guildSettings.switches.automod.imageSpam
						}
					/>
					<SwitchCard
						name="All Invites"
						description="The bot will delete invites sent to a channel."
						enabled={
							this.state.guildSettings.switches.automod.invites
						}
					/>
					<SwitchCard
						name="Mass Mentions"
						description="The bot will delete messages with over 10 mentions."
						enabled={
							this.state.guildSettings.switches.automod
								.massMentions
						}
					/>
					<SwitchCard
						name="Spoilers"
						description="The bot will delete all messages that are over 75% spoilers."
						enabled={
							this.state.guildSettings.switches.automod.spoilers
						}
					/>
				</div>
			);
		}
	}
);
