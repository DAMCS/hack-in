import React, { Component } from 'react';
import { Row, Col, Modal, ModalBody, ModalHeader, Button, NavLink, Spinner } from 'reactstrap';
import Typed from 'typed.js';
import ReactTerminal from 'react-terminal-component';
import { EmulatorState, FileSystem, OutputFactory, Outputs, History, defaultCommandMapping, CommandMapping } from 'javascript-terminal';
import { Form, FormGroup, Input } from 'reactstrap';
import ReactGA from 'react-ga';
import RoomTwo from 'assets/images/level2/leveltwo.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'


function initializeReactGA() {
	ReactGA.initialize(process.env.REACT_APP_GA_ID);
	ReactGA.pageview('/leveltwo');
}
class Terminal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pass: "",
		}

		this.handleChange = this.handleChange.bind(this);

	}
	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}
	componentDidMount() {
		const strings = ["Booting into Linux live mode..."]
		const options = {
			strings: strings,
			typeSpeed: 30
		};
		this.typed = new Typed(this.el, options);
	}
	componentWillUnmount() {
		this.typed.destroy();
	}
	handleSubmit() {
		axios({
			method: "post",
			url: "/api/level/completion",
			headers: {
				Authorization: "Bearer " + localStorage.getItem('token')
			},
			data: {
				levelId: 2,
				password: this.state.pass
			}
		}).then(response => {
			if (response.data.status === "Success") {
				toast.success(response.data.message);
				this.props.history.push('/');
			}
		})
			.catch(function (error) {
				console.log(error);
				toast.error('You entered the wrong code');
			});
	}
	render() {
		initializeReactGA();
		let customState = EmulatorState.create({
			'fs': FileSystem.create({
				'/home': {},
				'/bin': {},
				'/bin/passwd': { content: 'You are not allowed to access this file' },
				'/etc': {},
				'/Network': {},
				'/Network/netstat': { content: 'You are not allowed to access this file' },
				'/OS': {},
				'/OS/boot': { content: 'Contains boot information' },
				'/home/README': { content: 'This is a text file' },
				'/home/users/hacker': {},
				'/home/user/hacker/passwd': { content: 'Executable file' },
				'/etc/passwd': { content: "Not Authorized" },
				'/dev': {},
				'/dev/hda1': {},
				'/dev/hda1/WINDOWS': {},
				'/dev/hda1/WINDOWS/Users': {},
				'/dev/hda1/WINDOWS/Users/Desktop': {},
				'/dev/hda1/WINDOWS/Users/Desktop/DoorKey.txt': {content: "qazwsx007"},

			}),
			'commandMapping': CommandMapping.create({
				...defaultCommandMapping,
				'man': {
					'function': (state, opts) => {
						let code = "Hackin: All basic linux comands are supported!!!"
						return {
							output: OutputFactory.makeTextOutput(code)
						};
					},
					'optDef': {}
				},
				'sudo': {
					'function': (state, opts) => {
						let code = "Hackin: You are not a super user"
						return {
							output: OutputFactory.makeTextOutput(code)
						};
					},
					'optDef': {}
				},
			})
		});
		const defaultOutputs = customState.getOutputs();

		const newOutputs = Outputs.addRecord(
			defaultOutputs, OutputFactory.makeTextOutput(
				`Welcome to Linux Terminal`
			)
		);
		customState = customState.setOutputs(newOutputs);
		const defaultHistory = customState.getHistory();
		const newHistory = History.recordCommand(defaultHistory, 'history');
		customState = customState.setHistory(newHistory);
		return (
			<React.Fragment>
				<div class="h-100 w-100 p-4 d-flex flex-column justify-content-center">
					<Row className="p-4 h-25 w-100 d-flex justify-content-center align-self-center">
						<Col className="h-100 w-100 d-flex justify-content-center align-items-center">
							<span
								style={{ whiteSpace: 'pre' }}
								ref={(el) => { this.el = el; }}
							/>
						</Col>
					</Row>
					<Row className="h-100 w-100 border border-primary d-flex align-items-center" >
						<Col className="h-100 w-100">
							<ReactTerminal theme={
								{
									background: 'black',
									promptSymbolColor: '#00de4a',
									commandColor: '#00de4a',
									outputColor: '#00de4a',
									errorOutputColor: '#FF0000',
									fontSize: '1.1rem',
									spacing: '1%',
									fontFamily: 'monospace',
									width: '100%',
									height: '100%'
								}
							} promptSymbol='guest@Hackin>' emulatorState={customState} clickToFocus autoFocus={false} />
						</Col>
					</Row>
				</div>
			</React.Fragment>
		);
	}
}

export default class LevelTwo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			terminal: false,
			pass: '',
			modal: false,
			window: false,
			loading: false
		};

		this.toggle = this.toggle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.toggleWindow = this.toggleWindow.bind(this);
		let copy = this;

		var item = null;
		document.addEventListener('dragstart', function (e) {
			item = e.target;

			e.dataTransfer.setData('text', '');

		}, false);

		document.addEventListener('drop', function (e) {

			if (e.target.getAttribute('data-draggable') === 'target' && e.target.id === "terminal" && item.id === "usb") {
				copy.toggle();
				e.preventDefault();
			}
		}, false);
	}
	componentDidMount() {
		this.props.changeNavigation(2)
	}
	toggle() {
		this.setState(prevState => ({
			terminal: !prevState.terminal
		}));
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	toggleModal() {
		this.setState({
			modal: !this.state.modal
		})
	}
	toggleWindow() {
		this.setState({
			window: !this.state.window
		})
	}
	handleSubmit(event) {
		this.setState({loading:true});
		axios({
			method: "post",
			url: "/api/level/completion",
			headers: {
				Authorization: "Bearer " + localStorage.getItem('token')
			},
			data: {
				levelId: 2,
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
				this.setState({loading:false});
				toast.error(error.response.data.message);
			});
		event.preventDefault();
	}
	render() {
		if (this.state.terminal === false) {
			return (
				<React.Fragment>
					<div class="d-flex justify-content-center align-items-center">
						<img src={RoomTwo} alt='Room One' useMap='#image-door' class="d-flex justify-content-center" />
						<map name="image-door">
							{/* <area alt="door" title="door" coords="825,279,825,512,878,541,877,271" shape="poly" onClick={this.toggle} /> */}
							<area id="Entrance" alt="door2" title="Entrance" coords="373,309,494,520" shape="rect" onClick={this.toggleModal} />
							<area id='terminal' alt="terminal" title="terminal" data-draggable="target" coords="593,414,646,448" shape="rect" onClick={this.toggleWindow} />
							<area id="Exit" alt="door1" title="Exit" coords="72,308,74,615,118,578,116,310" shape="poly" />
						</map>
					</div>
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
					<Modal isOpen={this.state.window} toggle={this.toggleWindow} centered className="modal-lg">
						<ModalBody>
							<img src={require('../../assets/images/level2/windows.jpg')} alt="Windows" width="765px" height="400px" />
						</ModalBody>
					</Modal>
				</React.Fragment>
			)
		} else {
			return (
				<div class='w-100 h-100'>
					<Terminal onClick={this.toggle} />
					<NavLink className="back-button" onClick={() => { this.setState({ terminal: false }) }}>
						<FontAwesomeIcon icon={faChevronCircleLeft} size="1x" title="Back"></FontAwesomeIcon>
					</NavLink>
				</div>
			)
		}
	}
}
