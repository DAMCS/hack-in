import React, { Component } from 'react';
import { Accordion, Card, Button, Badge} from 'react-bootstrap';

class Announcement extends Component {

	constructor(props) {
		super(props);
		this.state = { display_name: "", display_value: "", data: [] };
	}
	componentDidMount() {

		let dummy_data = {
			data : [
				{
          "anno_id": 1,
          "anno_msg": "string",
          "updated_time": "2019-08-26T11:51:48.265Z",
          "seen": true
        }, {
          "anno_id": 2,
          "anno_msg": "string",
          "updated_time": "2019-08-26T11:51:48.265Z",
          "seen": true
        }, {
          "anno_id": 3,
          "anno_msg": "string",
          "updated_time": "2019-08-26T11:51:48.265Z",
          "seen": true
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
	announcement() {
		return this.state.data.map(function (object, i) {
			return (
        <Accordion.Collapse eventKey="0">
            <Card.Body>Anouncements comes here</Card.Body>
          </Accordion.Collapse>
      )
		});
	}

render() {
    return (
      <Accordion className="list-group">
        <Card>
          <Card.Header>
            <Accordion.Toggle style={{background:"black"}} className="btn bg-default" as={Button} eventKey="0">
              <img width="20px" alt="" height="20px" src={require('../Announcement/announcement.png')} />&nbsp;<Badge className="badge" variant="light">2</Badge>
            </Accordion.Toggle>
          </Card.Header>
          {this.announcement()}
        </Card>
      </Accordion>
    );
  }
}

export default Announcement;