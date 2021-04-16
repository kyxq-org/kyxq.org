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
		var inputID = `input-box-${id}`;
		return (
			<div className="DashboardSettingsCard">
				<p className="SettingsCardHeader">{header}</p>
				<p className="SettingsCardDesc">{desc}</p>
				<input
					className="SettingsCardPlaceholder"
					placeholder={currentState}
					id={inputID}
				/>
				<button
					onClick={() => this.updateValue()}
					className="SettingsCardButton"
					id={`input-button-${id}`}
				>
					Update
				</button>
			</div>
		);
	}

	updateValue(id) {
		var value = document.getElementById(`input-box-${id}`).value;
		if (value.length < 1) return;
		const { onUpdate } = this.props;
		document.getElementById(`input-button-${id}`).innerHTML = "Updated!"
		setTimeout(() => {
			document.getElementById(`input-button-${id}`).innerHTML = "Update"
		}, 3000)
		onUpdate(value);
	}
}
