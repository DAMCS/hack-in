import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import {Table,Modal,Button,ButtonToolbar,Jumbotron} from 'react-bootstrap';

class LeaderBoard extends Component {

	constructor(props) {
		super(props);
		this.state = { display_name: "", display_value: "", data: [] };
	}
	componentDidMount() {

		let dummy_data = {
			display_name: "Name/Level Progressed",
			display_value: "Points/Completed count",
			data : [
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

		// axios.get('http://13.235.77.118:3000/leaderboard',
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

function LeaderBoardModal(props) {
	return (
		<Modal
			{...props}
			aria-labelledby="contained-modal-title-vcenter"
			centered
			animation
			className="fade active in"
		>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					LeaderBoard
          		</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<LeaderBoard />
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default function Board() {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<ButtonToolbar>
			<a variant="primary" onClick={() => setModalShow(true)}>
				<img style={{marginLeft:"5px"}} width="30px" alt="" height="30px" src={require("../Inventory/hacker1.png")} />
     		</a>
			<LeaderBoardModal
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</ButtonToolbar>
	);
}