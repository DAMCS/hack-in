import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ReactGA from 'react-ga';
import Room1 from './Lift3.png';
import Room3d from './room3d.png';
import Numpad from './Numpad.js';
import NumpadReveal from './NumpadReveal';

function initializeReactGA() {
	ReactGA.initialize('UA-104887157-5');
	ReactGA.pageview('/levelone');
}


class DoorRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: 0
		};

		this.toggleNumpad = this.toggleNumpad.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.toggleReveal = this.toggleReveal.bind(this);
		let copy = this;

		document.addEventListener('drop', function (e) {

			if (e.target.getAttribute('data-draggable') === 'target') {
				console.log("test passed!!");
				copy.toggleReveal();
				e.preventDefault();
			}

		}, false);
	}

	closeModal() {
		this.setState({ modal: 0 });
	}

	toggleNumpad() {
		this.setState(prevState => ({
			modal: 1
		}));
	}

	toggleReveal() {
		this.setState({
			modal: 2
		})
	}

	render() {
		initializeReactGA();
		return (
			<div class="h-100 w-100 ">
				<img src={Room1} alt='Room One' useMap='#image-map' />
				<map name="image-map">
					<area alt="numbed" data-draggable="target" title="numbed" coords="611,286,656,375" shape="rect" onClick={this.toggleNumpad} />
				</map>
				<Modal isOpen={this.state.modal == 1} toggle={this.closeModal} className={this.props.className}>
					<ModalHeader toggle={this.closeModal}>Enter the Passcode</ModalHeader>
					<ModalBody>
						<Numpad />
					</ModalBody>
				</Modal>
				<Modal isOpen={this.state.modal == 2} toggle={this.closeModal} className={this.props.className}>
					<ModalHeader toggle={this.closeModal}>Enter the Passcode</ModalHeader>
					<ModalBody>
						<NumpadReveal />
					</ModalBody>
				</Modal>
			</div>
		)
	}
}

export default class LevelOne extends Component {
	constructor(props) {
		super(props);
		this.state = {
			door: false
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState(prevState => ({
			door: !prevState.door
		}));
	}

	render() {
		if (this.state.door == false) {
			return (
				<div className='levelOne'>
					<img src={Room3d} alt='Room One' onClick={this.toggle} />
				</div>
			)
		} else {
			return (
				<div className='levelOne'>
					<DoorRoom onClick={this.toggle} />
				</div>
			)
		}
	}
}