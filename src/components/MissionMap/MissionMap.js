import React from 'react';
import axios from 'axios';
import MapImage from './MAP-Final.png';
import './MissionMap.css';
import { Button } from 'reactstrap';

export default class MissionMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			level: []
		};

		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {
		const token = localStorage.getItem('token');
		axios({
			method: 'get',
			url: '/api/level/all',
			headers: {
				Authorization: "Bearer " + token
			}
		})
			.then(response => {
				console.log(response.data)
				this.setState({
					level: response.data.data
				})
			})
			.catch(function (error) {
				console.log(error);
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
		return (
			<div className='mission-map'>
				<img src={MapImage} alt='Mission Map' className='img' />
				{this.state.level.map((object, i) => {
					object.userLevelStatus === "completed" ? text_color = "green" : text_color = "red";
					return <Button className={"level" + (i + 1) + "-button"}
						disabled={object.levelStatus === "open" ? false : true}
						style={{ color: text_color }}
						onClick={() => this.handleClick(i + 1)} >{i + 1}
					</Button>
				})}
			</div>
		)
	}
}
