import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import {Table,Modal,Button,ButtonToolbar,Jumbotron} from 'react-bootstrap';

class LeaderBoard extends Component {

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
					<h2>LeaderBoard</h2>
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