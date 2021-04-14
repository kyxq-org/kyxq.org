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
			<div className="DashboardMessageCard">
				<p className="MessageCardHeader">{header}</p>
				<p className="MessageCardDesc">{desc}</p>
				<input
					className="MessageCardPlaceholder"
					placeholder={currentState}
					id={inputID}
				/>
				<p className="MsgCardExtras">
					<span className="MsgExtrasSpan">Preview:</span> Welcome <span className="FakeMention">@Olykir</span> to Kyxq Support!
				</p>
				<p className="MsgCardExtras">
					<span className="MsgExtrasSpan">Note: </span> Use{' '}
					<strong className="Highlighted">{'{user}'}</strong> and{' '}
					<strong className="Highlighted">{'{guild}'}</strong> to add
					guild/user names
				</p>
				<button className="SettingsCardButton">Update</button>
			</div>
		);
	}
}
