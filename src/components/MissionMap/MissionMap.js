import React from 'react';
import axios from 'axios';
import MapImage from 'assets/images/mission_map/map.jpg';
import { NavLink, Tooltip } from 'reactstrap';
import {Redirect} from 'react-router-dom';

class TooltipItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.toggle = this.toggle.bind(this);
		this.state = {
			tooltipOpen: false,
			level: 0
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
				this.setState({level: 1});
				break;
			case 2:
				this.setState({level: 2});
				break;
			case 3:
				this.setState({level: 3});
				break;
			case 4:
				this.setState({level: 4});
				break;
			case 5:
				this.setState({level: 5});
				break;
			case 6:
				this.setState({level: 6});
				break;
			case 7:
				this.setState({level: 7});
				break;
			case 8:
				this.setState({ level: 8 });
				break;
			default:
				break;
		}
	}

	render() {
		if (this.state.level === 1) {
			console.log('test 1');
			return <Redirect to = {{ pathname: "/dashboard/levelone" }} />;
		} else if (this.state.level === 2) {
			console.log('test 2');
			return <Redirect to = {{ pathname: "/dashboard/leveltwo" }} />;
		} else if (this.state.level === 3) {
			console.log('test 3');
			return <Redirect to = {{ pathname: "/dashboard/levelthree" }} />;
		} else if (this.state.level === 4) {
			console.log('test 4');
			return <Redirect to = {{ pathname: "/dashboard/levelfour" }} />;
		} else if (this.state.level === 5) {
			console.log('test 5');
			return <Redirect to = {{ pathname: "/dashboard/levelfive" }} />;
		} else if (this.state.level === 6) {
			console.log('test 6');
			return <Redirect to = {{ pathname: "/dashboard/levelsix" }} />;
		} else if (this.state.level === 7) {
			console.log('test 7');
			return <Redirect to = {{ pathname: "/dashboard/levelseven" }} />;
		} else if (this.state.level === 8) {
			console.log('test 8');
			return <Redirect to = {{ pathname: "/dashboard/leveleight" }} />;
		} else {
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
			.catch(error => {
				console.log(error);
				if (error.response.data.message === "Auth failed. Please Login.") {
					this.props.history.push("/");
				}
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
