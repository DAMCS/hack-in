import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import {Table} from 'react-bootstrap';

export default class LeaderBoard extends Component {

	constructor(props) {
		super(props);
		this.state = { leader_val: [] };
	}
	componentDidMount() {
		axios.get('http://13.235.77.118:3000/leaderboard',
		{headers: {
			"Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0ZXN0MTIzQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVkNWU5NjM2Njg4ZjZmMDZiMzUyOGQ5ZCIsImlhdCI6MTU2NjQ4MDAwOCwiZXhwIjoxNTY2NDgzNjA4fQ.U6TkCk3AvvVaX8RnhsBzrmZwucoMzR-WBLuMi9RtSJ4",
		  }
		}
		).then(response => {
			this.setState({ leader_val: response.data });
		})
		.catch(function (error) {
			console.log(error);
		})
	}
	tabRow() {
		return this.state.leader_val.map(function (object, i) {
			return <TableRow obj={object} key={i} />;
		});
	}

	render() {
		return (			
				<Table striped bordered hover>
					<thead>
						<tr className="active">
							<th>ID</th>
							<th>Name</th>
							<th>Points</th>
						</tr>
					</thead>
					<tbody>
					<tr className="success">
							<td>1</td>
							<td>Dummy</td>
							<td>0</td>
					</tr>
					{this.tabRow()}
					</tbody>
				</Table>
	
		);
	}
}