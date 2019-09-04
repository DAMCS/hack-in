import React, { Component } from 'react';
import TableRow from './TableRow';
import { Container, Table } from 'reactstrap';
import axios from 'axios';

export default class LeaderBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			leader_board: [],
		};
	}
	componentDidMount() {
		var token = localStorage.getItem('token');
		axios.get('/api/leaderboard',
			{
				headers: {
					"Authorization": "Bearer " + token
				}
			}
		).then(response => {
			this.setState({ leader_board: response.data });
		})
			.catch(function (error) {
				console.log(error);
			})
	}
	tabRow() {
		return this.state.leader_board.map((object, i) => {
			return <TableRow obj={object} key={i} />;
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