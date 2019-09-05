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
					{object.name_id}
				</td>
				<td>
					{object.level_pts}
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