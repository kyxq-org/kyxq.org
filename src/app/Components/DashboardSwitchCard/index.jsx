import React, { Component } from 'react';
import './style.css';

export default class SwitchCard extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		const { name, enabled, description } = this.props;
		return (
			<div className="DashboardSwitchCard">
				<div className="SwitchCardLeft">
					<p className="SwitchCardName">{name}</p>
					<p className="SwitchCardDescription">{description}</p>
				</div>
				<div className="SwitchCardRight">
					{/* <h1>Switch goes here</h1> */}
				</div>
			</div>
		);
	}
}
