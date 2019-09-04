import React, { Component } from 'react';
import TableRow from './TableRow';
import { Container, Table } from 'reactstrap';
import axios from 'axios';

export default class LeaderBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {display_name: "", display_value: "", data: [] };
	}
	componentDidMount() {

		let dummy_data = {
			display_name: "Name/Level Progressed",
			display_value: "Points/Completed count",
			data: [
				{
					"leader_id": 1,
					"leader_name": "Surya",
					"leader_pts": 1000
				},
				{
					"leader_id": 2,
					"leader_name": "Prasath",
					"leader_pts": 800
				}, {
					"leader_id": 3,
					"leader_name": "Tester",
					"leader_pts": 700
				}
			]
		}

		this.setState(dummy_data);
		var token = localStorage.getItem('token');
		axios.get('/api/leaderboard',
			{
				headers: {
					"Authorization": "Bearer " + localStorage.getItem('token')
				}
			}
		).then(response => {
			console.log(response.data);
				this.setState({
					data : response.data.data,
					display_name : response.data.name,
					display_value : response.data.count,
				})	
			})
			.catch(function (error) {
				console.log(error);
			})
	}
	tabRow() {
		return this.state.data.map(function (object, i) {
			return (
				<tr>
				<td>
					{
						i+1
					}
				</td>
				<td>
					{object.username}
				</td>
				<td>
					{object.score}
				</td>
			</tr>
			);
		});
	}

	render() {
		return (
			<Container fluid >
				<Table striped bordered hover responsive>
					<thead>
						<tr className="active">
							<th>ID</th>
							<th>USERNAME</th>
							<th>SCORE</th>
						</tr>
					</thead>
					<tbody>
						{this.tabRow()}
					</tbody>
				</Table>
			</Container>
		);
	}
}