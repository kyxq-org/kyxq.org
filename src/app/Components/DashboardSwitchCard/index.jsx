import React, { Component } from 'react';
import './style.css';
import Switch from '../Switch/index.jsx';
export default class SwitchCard extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		var { name, enabled, description } = this.props;
		return (
			<div className="DashboardSwitchCard">
				<div className="SwitchCardLeft">
					<p className="SwitchCardName">{name}</p>
					<p className="SwitchCardDescription">{description}</p>
				</div>
				<div className="SwitchCardRight">
					<Switch
						enabled={enabled}
						onUpdate={(e) => this.updateValue(e)}
					/>
				</div>
			</div>
		);
	}

	updateValue(bool) {
		const { onUpdate } = this.props;
		onUpdate(bool);
	}
}
