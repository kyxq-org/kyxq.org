import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GuildCard from '../../Components/GuildCard/index.jsx';
import './style.css';
export default withRouter(
	class dashboard extends Component {
		constructor(props) {
			super(props);
			this.props = props;
			this.state = {
				user: props.user,
				userLoaded: false,
			};
		}

		async componentDidMount() {
			if (!this.props.user) {
				this.setState({ userLoaded: false });
			} else {
				this.setState({ userLoaded: true });
			}
		}

		render() {
			console.log(this.state);
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
				return <h1>wip</h1>;
			}
		}
	}
);
