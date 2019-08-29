import React from 'react';
import { Modal,Button,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';

export default class Contact extends React.Component {
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
            <div>
                <a color="primary" onClick={this.toggle}><i class="fa fa-address-card" aria-hidden="true"></i></a>
                <Modal centered="true" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Contact</ModalHeader>
                    <ModalBody>
                        Co-ordinator : Surya Prasath S<br />
                        Email : hackin2019@gmail.com<br />
                        Phone : 9791745977<br />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}


// function ContactModal(props) {
//     return (
//         <Modal
//             {...props}
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//             animation
//             className="fade active in"
//         >
//             <ModalHeader>
//                     <h2>Contact</h2>
//             </ModalHeader>
//             <ModalBody>
//                 <Container>
//                 Co-ordinator : Surya Prasath S<br />
//                 Email : hackin2019@gmail.com<br />
//                 Phone : 9791745977<br />
//                 </Container>     
//             </ModalBody>
//             <ModalFooter>
//                 <Button onClick={props.onHide}>Close</Button>
//             </ModalFooter>
//         </Modal>
//     );
// }

// export default function Contact() {
//     const [modalShow, setModalShow] = React.useState(false);

//     return (
//         <ButtonToolbar>
//             <a variant="primary" onClick={() => setModalShow(true)}>
//                 <img style={{ marginLeft: "5px" }} width="30px" alt="" height="30px" src={require("../Inventory/hacker2.png")} />
//             </a>
//             <ContactModal
//                 show={modalShow}
//                 onHide={() => setModalShow(false)}
//             />
//         </ButtonToolbar>
//     );
// }