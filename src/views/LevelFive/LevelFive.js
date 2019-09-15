import React, { Component } from 'react';
import { Row, Col, Modal, ModalBody, ModalHeader, Button, NavLink, Spinner } from 'reactstrap';
import Typed from 'typed.js';
import ReactTerminal from 'react-terminal-component';
import { EmulatorState, FileSystem, OutputFactory, Outputs, History, defaultCommandMapping, CommandMapping } from 'javascript-terminal';
import { Form, FormGroup, Input } from 'reactstrap';
import ReactGA from 'react-ga';
import RoomFour from 'assets/images/level5/levelfive.jpg'
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'


function initializeReactGA() {
	ReactGA.initialize(process.env.REACT_APP_GA_ID);
	ReactGA.pageview('/levelfive');
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
		const strings = ["Booting into Linux..."]
		const options = {
			strings: strings,
			typeSpeed: 30
		};
		this.typed = new Typed(this.el, options);
	}
	componentWillUnmount() {
		this.typed.destroy();
	}
	
	render() {
		initializeReactGA();
		let customState = EmulatorState.create({
			'fs': FileSystem.create({
				'/home': {},
				'/bin': {},
				'/bin/passwd': { content: 'You are not allowed to access this file' },
				'/bin/clone': { content: 'Clones file to local storage.' },
				'/etc': {},
				'/Network': {},
				'/Network/netstat': { content: 'You are not allowed to access this file' },
				'/OS': {},
				'/OS/boot': { content: 'Contains boot information' },
				'/home/README': { content: 'This is not just a text file' },
				'/home/program.java': {content: 'Cannot display. Not in this Project directory.'},
				'/home/users/hacker': {},
				'/home/user/hacker/passwd': { content: 'Executable file' },
				'/home/user/hacker/door_logic': { content: 'Copyable file' },
				'/etc/passwd': { content: "Not Authorized" },
				'/dev': {},
				'/dev/hda1': {},
				'/dev/hda1/script.py': {content: 'Permission restricted.'},
				'/var': {},
				'/var/www': {},
				'/var/www/html': {},
				'/var/www/html/index.html': {content: '<html><head><title>Door key display page</title></head><body id="showkey"></body></html>'},
				'/var/www/html/index.js': {content: 'console.log("You came very close");'},
				'/var/www/html/App.js': {content: 'Permission restricted.'},
				'/var/www/html/README': {content: 'Installation : git clone <repo name>.'},
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
				'clone': {
					'function': (state, opts) => {
						if (opts.length !== 0) {
							if (opts[0] === 'door_logic') {
								return window.open("/door_key");
							} else {
								return {
									output: OutputFactory.makeTextOutput("File can't be cloned.")
								};
							}
						} else {
							return {
								output: OutputFactory.makeTextOutput("Enter file to clone...")
							};
						}
					},
					'optDef': {}
				},
			})
		});
		const defaultOutputs = customState.getOutputs();

		const newOutputs = Outputs.addRecord(
			defaultOutputs, OutputFactory.makeTextOutput(
				`Welcome to secured shell!`
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
							} promptSymbol='Schwarz@Hackin>' emulatorState={customState} clickToFocus autoFocus={false} />
						</Col>
					</Row>
				</div>
			</React.Fragment>
		);
	}
}

export default class LevelFive extends Component {
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
		var item = null;
		document.addEventListener('dragstart', function (e) {
			item = e.target;
			console.log(item.id);
			e.dataTransfer.setData('text', '');

		}, false);
	}
	componentDidMount() {
		this.props.changeNavigation(5)
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
				levelId: 5,
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
						<img src={RoomFour} alt='Room Four' useMap='#image-door' />
						<map name="image-door">
							{/* <area alt="door" title="door" coords="825,279,825,512,878,541,877,271" shape="poly" onClick={this.toggle} /> */}
							<area id="Entrance" alt="door2" title="Entrance" coords="189,312,311,524" shape="rect" onClick={this.toggleModal} />
							<area id='terminal' alt="terminal" title="terminal" coords="637,373,717,428" shape="rect" onClick={this.toggle}/>
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
					{/* <Modal isOpen={this.state.window} toggle={this.toggleWindow} centered className="modal-lg">
						<ModalBody>
							<img src={require('../../assets/images/level4/monali_saw.jpg')} alt="stylesuxx" style={{"display":"none"}} />
							<img src={require('../../assets/images/level4/mona.png')} alt="Monalisa" width="765px" height="400px" />
						</ModalBody>
					</Modal> */}
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
