import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, NavLink } from 'reactstrap';
import ReactGA from 'react-ga';
import Arrow from '@elsdoerfer/react-arrow';
import Typed from 'typed.js';
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer, faDesktop } from '@fortawesome/free-solid-svg-icons'
import DataFlow from './DataFlow.js'
import axios from 'axios';
function initializeReactGA() {
	ReactGA.initialize('UA-104887157-5');
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
			print("Captured packet number:"+str(i + 1))
			print(packet.http.request_full_uri)
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
			print("Captured packet number:"+str(i + 1))
			print(packet.http.request_full_uri)
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

export default class LevelThree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pass: "",
			check: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	handleCheck() {
		this.setState({
			check: true
		})
	}
	handleSubmit(event){
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
			toast.error(error.response.data.message);
		});	
		event.preventDefault();
	}
	render() {
		initializeReactGA();
		return (
			<React.Fragment>
				<div class="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
					<Row class="h-25 w-100 d-flex justify-content-center">
						<div class="d-flex justify-content-center align-items-center"><FontAwesomeIcon icon={faDesktop} size="5x" /></div>
						<div class="d-flex justify-content-center align-items-center"><DataFlowModal handleCheck={this.handleCheck} /></div>
						<div class="d-flex justify-content-center align-items-center"><FontAwesomeIcon icon={faServer} size="5x" /></div>
					</Row>
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
							<FontAwesomeIcon icon={faDesktop} size="5x" />
							<div>
								{this.state.check === true ? <TypedReact content='Your passcode is 11110 00001 00011 00011 1 11000 00000 1' className="p-4 h-100 w-100" /> : ''}
							</div>
							<Form className="p-4 h-100 w-100" onSubmit={this.handleSubmit}>
								<FormGroup className="w-100">
									<Input className="w-100" value={this.state.pass} onChange={this.handleChange} type="password" name="pass" placeholder="passcode" />	<br />
								</FormGroup>
								<Button color="success text-white">Submit</Button>
							</Form>
						</Col>
					</Row>
				</div>
			</React.Fragment>
		)
	}
}