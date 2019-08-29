import React, { Component } from 'react';
import TableRow from './TableRow';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

class LeaderBoard extends Component {

	constructor(props) {
		super(props);
		this.state = { display_name: "", display_value: "", data: [] };
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

		// axios.get('/api/leaderboard',
		// {headers: {
		// 	"Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0ZXN0MTIzQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVkNWU5NjM2Njg4ZjZmMDZiMzUyOGQ5ZCIsImlhdCI6MTU2NjQ4MDAwOCwiZXhwIjoxNTY2NDgzNjA4fQ.U6TkCk3AvvVaX8RnhsBzrmZwucoMzR-WBLuMi9RtSJ4",
		//   }
		// }
		// ).then(response => {
		// 	this.setState({ leader_val: response.data });
		// })
		// .catch(function (error) {
		// 	console.log(error);
		// })
	}
	tabRow() {
		return this.state.data.map(function (object, i) {
			return <TableRow obj={object} key={i} />;
		});
	}

	render() {
		return (
			<Table striped bordered hover>
				<thead>
					<tr className="active">
						<th>ID</th>
						<th>{this.state.display_name}</th>
						<th>{this.state.display_value}</th>
					</tr>
				</thead>
				<tbody>
					{this.tabRow()}
				</tbody>
			</Table>

		);
	}
}

export default class LeaderBoardModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	render() {
		return (
			<LeaderBoard />
		);
	}
}
