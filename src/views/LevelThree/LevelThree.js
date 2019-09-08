import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, NavLink, Spinner } from 'reactstrap';
import ReactGA from 'react-ga';
import Arrow from '@elsdoerfer/react-arrow';
import Typed from 'typed.js';
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer, faDesktop, faChevronCircleLeft, faLaptop } from '@fortawesome/free-solid-svg-icons'
import RoomThree from 'assets/images/level3/levelthree.jpg'
import DataFlow from './DataFlow.js'
import axios from 'axios';
function initializeReactGA() {
	ReactGA.initialize(process.env.REACT_APP_GA_ID);
	ReactGA.pageview('/levelthree');
}

class TypedReact extends React.Component {
	componentDidMount() {
		const strings = [this.props.content];
		const options = {
			strings: strings,
			typeSpeed: 50,
			backSpeed: 30
		};
		this.typed = new Typed(this.el, options);
	}

	componentWillUnmount() {
		this.typed.destroy();
	}

	render() {
		return (
			<React.Fragment>
				<span
					style={{ whiteSpace: 'pre' }}
					ref={(el) => { this.el = el; }}
				/>
			</React.Fragment>
		);
	}
}
class DataFlowModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			code: `import pyshark
net_interface = 'wlan0'
capture_time = 20
capture = pyshark.LiveCapture(interface = net_interface)
capture.sniff(timeout = capture_time)
for i in range(len(capture)):
  packet = capture[i]
  try:
    if packet.http.request_method == 'GET':
      print(packet["urlencoded-form"])
  except:
    pass`,
			codeTrue: `import pyshark
net_interface = 'wlan0'
capture_time = 20
capture = pyshark.LiveCapture(interface = net_interface)
capture.sniff(timeout = capture_time)
for i in range(len(capture)):
  packet = capture[i]
  try:
    if packet.http.request_method == 'POST':
      print(packet["urlencoded-form"])
  except:
    pass`,
		};
		this.toggle = this.toggle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	toggle() {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}
	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}
	handleSubmit() {
		if (this.state.codeTrue === this.state.code) {
			toast.success('Solved the code');
			this.props.handleCheck();
		} else {
			toast.error('Wrong code');
		}
		this.toggle();
	}
	render() {
		return (
			<div class="h-100 w-100">
				<NavLink className="h-100 w-100" style={{ cursor: "pointer" }} onClick={this.toggle}><DataFlow /></NavLink>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
					<ModalHeader>
						<TypedReact content="Code to tap the network!!!" />
					</ModalHeader>
					<ModalBody>
						<Input style={{ height: "300px", fontSize: "10px" }} type="textarea" name="code" value={this.state.code} onChange={this.handleChange} />
					</ModalBody>
					<ModalFooter>
						<Button color="success text-white" onClick={this.handleSubmit}>Submit</Button>
						<Button color="danger text-white" onClick={this.toggle}>Close</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

class Transmission extends Component {
	constructor(props) {
		super(props);
		this.state = {
			check: false,
			window: false,
		}
		this.handleCheck = this.handleCheck.bind(this);
		this.toggleWindow = this.toggleWindow.bind(this);
	}
	handleCheck() {
		this.setState({
			check: true
		})
	}

	toggleWindow() {
		this.setState({
			window: !this.state.window
		})
	}

	render() {
		initializeReactGA();
		return (
			<React.Fragment>
				<TypedReact content="Initializing Wireshark..." />
				<div class="h-10 w-100 d-flex flex-column justify-content-center align-items-center">
					<Row class="h-25 w-100 d-flex justify-content-center">
						<div class="d-flex justify-content-center align-items-center"><FontAwesomeIcon icon={faDesktop} onClick={this.toggleWindow} size="5x" /></div>
						<div class="d-flex justify-content-center align-items-center"><DataFlowModal handleCheck={this.handleCheck} /></div>
						<div class="d-flex justify-content-center align-items-center"><FontAwesomeIcon icon={faServer} size="5x" /></div>
					</Row>
					<Modal isOpen={this.state.window} toggle={this.toggleWindow} centered className="modal-lg">
						<ModalBody>
							<img src={require('../../assets/images/level3/network.png')} alt="Windows" width="765px" height="400px" />
						</ModalBody>
					</Modal>
					<Row class="h-100 w-100 d-flex">
						<Col className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
							<Arrow
								angle={0}
								length={40}
								style={{
									width: '70px',
								}}
								arrowHeadFilled={true}
								color='#00de4a'
								lineDashed="0.9"
							/>
							<FontAwesomeIcon icon={faLaptop} color='red' size="5x" />
							<div className="p-2">
								{this.state.check === true ? <TypedReact content='11110 00001 00011 00011 1 11000 00000 1' className="p-4 h-100 w-100" /> : ''}
							</div>
						</Col>
					</Row>
				</div>
			</React.Fragment>
		)
	}
}

export default class LevelThree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			door: false,
			modal: false,
			pass: '',
			loading: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggle = this.toggle.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		this.props.changeNavigation(3);
	}

	toggle() {
		this.setState(prevState => ({
			door: !prevState.door
		}));
	}
	toggleModal() {
		this.setState({
			modal: !this.state.modal
		})
	}
	handleSubmit(event) {
		this.setState({loading: true});
		axios({
			method: "post",
			url: "/api/level/completion",
			headers: {
				Authorization: "Bearer " + localStorage.getItem('token')
			},
			data: {
				levelId: 3,
				password: this.state.pass
			}
		}).then(response => {
			this.setState({loading:false});
			if (response.data.status === "Success") {
				toast.success(response.data.message);
				this.props.history.push('/');
			}
		})
			.catch(error => {
				console.log(error);
				this.setState({loading:false});
				toast.error(error.response.data.message);
			});
		event.preventDefault();
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	render() {
		if (this.state.door === false) {
			return (
				<div className='levelOne'>
					<img src={RoomThree} alt='Room Three' useMap='#image-door' />
					<map name="image-door">
						<area alt="router" title="router" coords="286,440,309,457" shape="rect" onClick={this.toggle} />
						<area alt="door" title="door" coords="625,309,745,521" shape="rect" onClick={this.toggleModal} />
					</map>
					<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
						<ModalHeader>Enter the Passcode</ModalHeader>
						<ModalBody>
							<Form onSubmit={this.handleSubmit}>
								<FormGroup>
									<Input value={this.state.pass} onChange={this.handleChange} type="password" name="pass" placeholder="passcode" />
								</FormGroup>
								<Button color="success" disabled={this.state.loading} type="submit" className="success text-white">{this.state.loading?<Spinner /> :""} Submit</Button>&nbsp;
								<Button color="danger" onClick={this.toggleModal} className="danger text-white">Close</Button>
							</Form>
						</ModalBody>
					</Modal>
				</div>
			)
		} else {
			return (
				<div className='levelOne'>
					<Transmission onClick={this.toggle} />
					<NavLink className="back-button" onClick={() => { this.setState({ door: false }) }}>
						<FontAwesomeIcon icon={faChevronCircleLeft} size="1x" title="Back"></FontAwesomeIcon>
					</NavLink>
				</div>
			)
		}
	}
}