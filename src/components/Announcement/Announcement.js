import React from 'react';
import { Accordion, Card, Button, Badge} from 'react-bootstrap';

function Anouncement() {
    return (
      <Accordion className="list-group">
        <Card>
          <Card.Header>
            <Accordion.Toggle style={{background:"black"}} className="btn bg-default" as={Button} eventKey="0">
              <img width="20px" alt="" height="20px" src={require('../Announcement/announcement.png')} />&nbsp;<Badge className="badge" variant="light">2</Badge>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Anouncements comes here</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }

export default Anouncement;