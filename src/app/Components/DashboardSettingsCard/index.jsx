import React, { Component } from 'react';
import './style.css';
export default class DashboardSettingsCard extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			header: props.header,
			currentState: props.currentState,
			desc: props.desc,
		};
	}

	render() {
		const { header, currentState, desc, id } = this.state;
        var inputID = `input-box-${id}`
		return (
			<div className="DashboardSettingsCard">
				<p className="SettingsCardHeader">{header}</p>
				<p className="SettingsCardDesc">{desc}</p>
				<input
					className="SettingsCardPlaceholder"
					placeholder={currentState}
					id={inputID}
				/>
				<button className="SettingsCardButton">Update</button>
			</div>
		);
	}
}
