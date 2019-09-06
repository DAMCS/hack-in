import React, { Component } from 'react';
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
					display_name : response.data.name,
					display_value : response.data.count,
					data : response.data.data,
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
							<th>{this.state.display_name}</th>
							<th>{this.state.display_value}</th>
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