import React, { Component } from 'react';
import { Row, Col, Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import Typed from 'typed.js';
import ReactTerminal from 'react-terminal-component';
import { EmulatorState, FileSystem, OutputFactory, Outputs, History, defaultCommandMapping, CommandMapping } from 'javascript-terminal';
import { Form, FormGroup, Input } from 'reactstrap';
import ReactGA from 'react-ga';
import RoomTwo from 'assets/images/level2/leveltwo.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';

function initializeReactGA() {
	ReactGA.initialize('UA-104887157-5');
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
		const strings = ["Look here...we got a terminal!!!"]
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
				levelId: 3,
				password: this.state.pass
			}
		}).then(response => {
			if (response.data.status === "Success") {
				toast.success(response.data.message);
				this.props.history.push('/dashboard/');
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
				'/home/user/hacker/passwd': { content: 'You fool!!!' },
				'/etc/passwd': { content: "Does'nt work like unix :) =>" }
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
				'run': {
					'function': (state, opts) => {
						const input = opts.join(' ');
						let code = ''
						if (input === "passwd") {
							code = 'A*&^vdcvW$'
						} else if (input === '') {
							code = 'Please give a filename'
						}
						else {
							code = 'Wrong file'
						}
						return {
							output: OutputFactory.makeTextOutput(code)
						};
					},
					'optDef': {}
				}
			})
		});
		const defaultOutputs = customState.getOutputs();

		const newOutputs = Outputs.addRecord(
			defaultOutputs, OutputFactory.makeTextOutput(
				`Welcome Hacker to TERMINAL`
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
			modal: false
		};

		this.toggle = this.toggle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		let copy = this;

		var item = null;
		document.addEventListener('dragstart', function (e) {
			item = e.target;

			e.dataTransfer.setData('text', '');

		}, false);

		document.addEventListener('drop', function (e) {

			if (e.target.getAttribute('data-draggable') === 'target' && e.target.id === item.id) {
				console.log("test passed!!");
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
				this.props.history.push('/dashboard/');
			}
		})
			.catch(function (error) {
				toast.error(error.response.data.message);
			});
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
							<area id='terminal' alt="terminal" title="terminal" data-draggable="target" coords="593,414,646,448" shape="rect" />
							<area id='terminal' alt="terminal" title="terminal" data-draggable="target" coords="593,414,646,448" shape="rect" />
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
							</Form>
						</ModalBody>
						<ModalFooter>
							<Button color="success" className="success text-white">Submit</Button>
							<Button color="danger" onClick={this.toggleModal} className="danger text-white">Close</Button>
						</ModalFooter>
					</Modal>
				</React.Fragment>
			)
		} else {
			return (
				<div class='w-100 h-100'>
					<Terminal onClick={this.toggle} />
				</div>
			)
		}
	}
}
