import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ReactGA from 'react-ga';
import Room1 from './Lift3.png';
import Numpad from './Numpad.js';

function initializeReactGA() {
	ReactGA.initialize('UA-104887157-5');
	ReactGA.pageview('/levelone');
}

export default class LevelOne extends Component {
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
		initializeReactGA();
		return (
			<div className='levelOne'>
				<img src={Room1} alt='Room One' useMap='#image-map' />
				<map name="image-map">
					<area alt="numbed" title="numbed" coords="611,286,656,375" shape="rect" onClick={this.toggle} />
				</map>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					<ModalHeader toggle={this.toggle}>Enter the Passcode</ModalHeader>
					<ModalBody>
						<Numpad />
					</ModalBody>
				</Modal>
			</div>
		)
	}
}