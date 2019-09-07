import React from 'react';
import axios from 'axios';
import MapImage from 'assets/images/mission_map/map.jpg';
import { NavLink, Tooltip } from 'reactstrap';

class TooltipItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.toggle = this.toggle.bind(this);
		this.state = {
			tooltipOpen: false
		};
	}

	toggle() {
		this.setState({
			tooltipOpen: !this.state.tooltipOpen
		});
	}

	handleClick(eventNumber) {
		this.props.getLevel(eventNumber);
		switch (eventNumber) {
			case 1:
				this.props.history.push('/dashboard/levelone');
				break;
			case 2:
				this.props.history.push('/dashboard/leveltwo');
				break;
			case 3:
				this.props.history.push('/dashboard/levelthree');
				break;
			default:
				this.props.history.push('/dashboard/');
				break;
		}
	}

	render() {
		let text_color = '';
		this.props.object.userLevelStatus === "completed" ? text_color = "green" : text_color = "red";
		return (
			<div class="h-100 w-100 d-flex justify-content-center align-items-center">
				<NavLink href="#" id={'Level-' + this.props.id} className={"level" + (this.props.i + 1) + "-button"}
					disabled={this.props.object.levelStatus === "closed" || this.props.object.userLevelStatus === "completed" || this.props.currentlevel !== (this.props.i + 1)? true : false}
					style={{ color: text_color }}
					onClick={() => {
						this.handleClick(this.props.i + 1)
					}}>{this.props.i + 1}
				</NavLink>
				<Tooltip placement="top" isOpen={this.state.tooltipOpen} target={'Level-' + this.props.id} toggle={this.toggle}>
					Level {this.props.id + 1}
				</Tooltip>
			</div>
		);
	}
}

export default class MissionMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			level: [],
			currentlevel: ""
		};
	}
	componentDidMount() {
		this.props.changeNavigation(0);
		const token = localStorage.getItem('token');
		axios({
			method: 'get',
			url: '/api/level/all',
			headers: {
				Authorization: "Bearer " + token
			}
		})
			.then(response => {
				this.setState({
					level: response.data.data,
					currentlevel: response.data.currentLevel
				})
			})
			.catch(function (error) {
				console.log(error);
			});
	}



	render() {

		return (
			<React.Fragment>
				<div className="fill h-100 w-100">
					<img src={MapImage} alt='Map' className="img h-100 w-100" />
					<div class="fill">
						{this.state.level.map((object, i) => {
							return <TooltipItem key={i} id={i} object={object} currentlevel={this.state.currentlevel} i={i} {...this.props} />;
						})}
					</div>
				</div>

			</React.Fragment>
		)
	}
}
