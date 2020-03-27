import React, { Component } from "react";
import { Container } from "reactstrap";
import { Button, NavLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Contact extends React.Component {
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
				<NavLink style={{ color: "#2ea155" }} href="#" onClick={this.toggle}>
					<i
						id="social-tw"
						class="fa fa-address-card fa-3x social"
					/>
				</NavLink>
				<Modal centered="true" isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
					<ModalHeader>Contact</ModalHeader>
					<ModalBody>
						<div class="p-2 mx-auto">
							Co-ordinator : Surya Prasath S<br />
							Email : hackinpsg2019@gmail.com<br />
							Phone : 9791745977<br />
						</div>
					</ModalBody>
					<ModalFooter>
						<Button color="danger text-white" onClick={this.toggle}>Close</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default class Footer extends Component {
	render() {
		return (
			<React.Fragment>
				<Container fluid className="h-100 w-100 d-flex justify-content-center align-items-end">
					<div id="lab_social_icon_footer h-100 w-100 d-flex justify-content-between">
						<div style={{ float: "left" }} className="d-flex justify-content-start align-items-center">
								Login 2k19,<br /> PSG College of Technology.
									</div>
							<div style={{ float: "right" }} class="d-flex justfy-content-end align-items-center">
								<div style={{ float: "left" }}>
									<Contact />
								</div>
								<NavLink style={{ color: "#2ea155" }} href="https://www.facebook.com/psg.symposium/" target="_blank" rel="noreferrer">
									<i
										id="social-fb"
										class="fa fa-facebook-square fa-3x social"
									/>
								</NavLink>
								<NavLink style={{ color: "#2ea155" }} href="https://youtu.be/M4Vv4ZmUzbc" target="_blank" rel="noreferrer">
									<i
										id="social-gp"
										class="fa fa-youtube-play fa-3x social"
									/>
								</NavLink>
								<NavLink style={{ color: "#2ea155" }} href="mailto:hackinpsg2019@gmail.com" target="_blank" rel="noreferrer">
									<i
										id="social-em"
										class="fa fa-envelope-square fa-3x social"
									/>
								</NavLink>
							</div>
					</div>
				</Container>
			</React.Fragment>
		);
	}
}
