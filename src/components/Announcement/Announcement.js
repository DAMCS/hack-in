import React from 'react';
import { Accordion, Card, ListGroupItem, Badge} from 'react-bootstrap';

function Anouncement() {
    return (
      <Accordion className="list-group">
        <Card>
          <Card.Header>
            <Accordion.Toggle className="list-group-item" as={ListGroupItem} variant="link" eventKey="0">
              Anouncements<Badge className="badge" variant="light">2</Badge>
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