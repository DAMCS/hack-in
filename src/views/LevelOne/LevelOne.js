import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ReactGA from 'react-ga';
import Door from 'assets/images/level1/Door.png';
import RoomOne from 'assets/images/level1/levelone.jpg';
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

		var item = null;
		document.addEventListener('dragstart', function (e) {
			console.log(e.target.id);
			item = e.target;
			e.dataTransfer.setData('text', '');

		}, false);

		document.addEventListener('drop', function (e) {

			if (e.target.getAttribute('data-draggable') === 'target' && e.target.id === item.id) {
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
				<img src={Door} alt='Room One' useMap='#image-map' class="h-100 w-100" />
				<map name="image-map">
					<area alt="numpad" id="numpad" data-draggable="target" title="numpad" coords="608,424,640,476" shape="rect" onClick={this.toggleNumpad} />
				</map>
				<Modal isOpen={this.state.modal === 1} toggle={this.closeModal} className={this.props.className}>
					<ModalHeader toggle={this.closeModal}>Enter the Passcode</ModalHeader>
					<ModalBody>
						<Numpad pushBack={this.props.pushBack} />
					</ModalBody>
				</Modal>
				<Modal isOpen={this.state.modal === 2} toggle={this.closeModal} className={this.props.className}>
					<ModalHeader toggle={this.closeModal}>Enter the Passcode</ModalHeader>
					<ModalBody>
						<NumpadReveal pushBack={this.props.pushBack} />
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
		this.pushBack = this.toggle.bind(this);
	}
	componentDidMount() {
		this.props.changeNavigation(1);
	}
	toggle() {
		this.setState(prevState => ({
			door: !prevState.door
		}));
	}

	pushBack() {
		this.props.history.push('/dashboard');
	}

	render() {
		if (this.state.door === false) {
			return (
				<div className='levelOne'>
					<img src={RoomOne} alt='Room One' useMap='#image-door' />
					<map name="image-door">
						<area alt="door" title="door" coords="825,279,825,512,878,541,877,271" shape="poly" onClick={this.toggle} />
					</map>
				</div>
			)
		} else {
			return (
				<div className='levelOne'>
					<DoorRoom onClick={this.toggle} pushBack={this.pushBack} />
				</div>
			)
		}
	}
}