import React from 'react';
import { Modal,Button,ButtonToolbar, Container} from 'reactstrap';


function ContactModal(props) {
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
                    <h2>Contact</h2>
          		</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                Co-ordinator : Surya Prasath S<br />
                Email : hackin2019@gmail.com<br />
                Phone : 9791745977<br />
                </Container>     
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function Contact() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <ButtonToolbar>
            <a variant="primary" onClick={() => setModalShow(true)}>
                <img style={{ marginLeft: "5px" }} width="30px" alt="" height="30px" src={require("../Inventory/hacker2.png")} />
            </a>
            <ContactModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </ButtonToolbar>
    );
}