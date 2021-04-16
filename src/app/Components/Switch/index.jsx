import React from 'react';
import './style.scss';
class Switch extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			enabled: this.props.enabled,
		};
	}

	render() {
		const { enabled } = this.state;
		const { onUpdate } = this.props;
		return (
			<label className="SwitchDiv">
				<input
					className="SwitchInputCheckbox"
					type="checkbox"
					checked={enabled}
					onChange={(e) => {
						this.setState({
							enabled: !this.state.enabled
						})
						onUpdate(!this.state.enabled)
					}}
				/>
				<span className="SwitchSlider" />
			</label>
		);
	}
}

export default Switch;
