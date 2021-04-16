import React, { Component } from 'react';
import fetch from 'node-fetch';
import { apiBase } from '../../../../config.json';
import SettingsCard from '../../Components/DashboardSettingsCard/index.jsx';
import MessageCard from '../../Components/DashboardMessageCard/index.jsx';
import SwitchCard from '../../Components/DashboardSwitchCard/index.jsx';
export default class guildSettings extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		return this.projector();
	}

	projector() {
		switch (this.props.tab) {
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

	async changeSetting(value, guildID, newValue) {
		var res = await fetch(`${apiBase}/dashboard/changesetting`, {
			headers: {
				settingName: value,
				guildID: guildID,
				newValue: newValue,
			},
		}).then((r) => r.json());
		console.log(res);
	}

	renderHome() {
		return (
			<div>
				<p className="SettingsPaneHeader">General Settings</p>
				<div className="Flexbox-Dash">
					<SettingsCard
						header="prefix"
						currentState={this.props.guildSettings.prefix}
						desc="The bots prefix"
						id="prefix"
						onUpdate={(value) =>
							this.changeSetting(
								'prefix',
								this.props.guildID,
								value
							)
						}
					/>
				</div>
			</div>
		);
	}

	renderJoinLeave() {
		return <h1>Join leave components</h1>;
	}

	renderAutomod() {
		return (
			<div>
				<p className="SettingsPaneHeader">Auto Mod Settings</p>
				<div className="Flexbox-Dash">
					<SwitchCard
						name="All Caps"
						description="The bot will delete all messages with over 75% capital letters."
						enabled={
							this.props.guildSettings.switches.automod.allCaps
						}
						onUpdate={(val) =>
							this.changeSetting(
								'allcaps',
								this.props.guildID,
								val
							)
						}
					/>
					<SwitchCard
						name="All Links"
						description="The bot will delete all links sent in a channel."
						enabled={
							this.props.guildSettings.switches.automod.allLinks
						}
						onUpdate={(val) =>
							this.changeSetting(
								'alllinks',
								this.props.guildID,
								val
							)
						}
					/>
					<SwitchCard
						name="Duplicate Text"
						description="The bot will delete duplicated text."
						enabled={
							this.props.guildSettings.switches.automod
								.duplicateText
						}
						onUpdate={(val) =>
							this.changeSetting(
								'dupetext',
								this.props.guildID,
								val
							)
						}
					/>
					<SwitchCard
						name="Fast Messages"
						description="The bot will delete messages being spammed (by the same user)."
						enabled={
							this.props.guildSettings.switches.automod.fastmsg
						}
						onUpdate={(val) =>
							this.changeSetting(
								'fastmsg',
								this.props.guildID,
								val
							)
						}
					/>
					<SwitchCard
						name="Image Spam"
						description="The bot will delete images that are being sent multiple times."
						enabled={
							this.props.guildSettings.switches.automod.imageSpam
						}
						onUpdate={(val) =>
							this.changeSetting(
								'imgspam',
								this.props.guildID,
								val
							)
						}
					/>
					<SwitchCard
						name="All Invites"
						description="The bot will delete invites sent to a channel."
						enabled={
							this.props.guildSettings.switches.automod.invites
						}
						onUpdate={(val) =>
							this.changeSetting(
								'allinvites',
								this.props.guildID,
								val
							)
						}
					/>
					<SwitchCard
						name="Mass Mentions"
						description="The bot will delete messages with over 10 mentions."
						enabled={
							this.props.guildSettings.switches.automod
								.massMention
						}
						onUpdate={(val) =>
							this.changeSetting(
								'massmention',
								this.props.guildID,
								val
							)
						}
					/>
					<SwitchCard
						name="Spoilers"
						description="The bot will delete all messages that are over 75% spoilers."
						enabled={
							this.props.guildSettings.switches.automod.spoilers
						}
						onUpdate={(val) =>
							this.changeSetting(
								'spoilers',
								this.props.guildID,
								val
							)
						}
					/>
				</div>
			</div>
		);
	}
}
