import React, { Component } from 'react';
import {Row, Col,Container} from 'reactstrap';
import DataFlow from './DataFlow.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer,faDesktop} from '@fortawesome/free-solid-svg-icons'
import ReactGA from 'react-ga';
import { Button, Modal, ModalHeader,ModalBody, ModalFooter,Form,FormGroup,Input } from 'reactstrap';
import Arrow from '@elsdoerfer/react-arrow';
import Typed from 'typed.js';
import { toast } from 'react-toastify'

function initializeReactGA() {
	ReactGA.initialize('UA-104887157-5');
	ReactGA.pageview('/levelthree');
}


class TypedReact extends React.Component {
	constructor(props){
		super(props);
	}	
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
			code: "import pyshark" + "\n" +
					"net_interface = 'wlan0'" + "\n" +
					"capture_time = 20" + "\n" +
					"capture = pyshark.LiveCapture(interface = net_interface)" + "\n" +
					"capture.sniff(timeout = capture_time)" + "\n" +
					"for i in range(len(capture)):" + "\n" +
					"  packet = capture[i]" + "\n" +
					"  try:" + "\n" +
					"    if packet.http.request_method == 'GET':" + "\n" +
					"      print(\"Captured packet number:\"+str(i + 1))" + "\n" +
					"      print(packet.http.request_full_uri)" + "\n" +
					"      print(packet[\"urlencoded-form\"])" + "\n" +
					"    except:" + "\n" +
					"      pass",
			codeTrue: "import pyshark" + "\n" +
						"net_interface = 'wlan0'" + "\n" +
						"capture_time = 20" + "\n" +
						"capture = pyshark.LiveCapture(interface = net_interface)" + "\n" +
						"capture.sniff(timeout = capture_time)" + "\n" +
						"for i in range(len(capture)):" + "\n" +
						"  packet = capture[i]" + "\n" +
						"  try:" + "\n" +
						"    if packet.http.request_method == 'POST':" + "\n" +
						"      print(\"Captured packet number:\"+str(i + 1))" + "\n" +
						"      print(packet.http.request_full_uri)" + "\n" +
						"      print(packet[\"urlencoded-form\"])" + "\n" +
						"    except:" + "\n" +
						"      pass"
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
	handleChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}
	handleSubmit(){
		if (this.state.codeTrue === this.state.code) {
			toast.success('Solved the code');
			this.props.handleCheck();
		}else{
			toast.error('Wrong code');
		}
		this.toggle();
	}
	render() {
		return (
			<div>
				<a style={{cursor:"pointer"}} onClick={this.toggle}><DataFlow /></a>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
					<ModalHeader>
						<TypedReact content="Code to tap the network!!!"/>
					</ModalHeader>
					<ModalBody>
						<Input style={{ height: "300px",fontSize:"13px"}} type="textarea" name="code" value={this.state.code} onChange={this.handleChange}/>
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
	constructor(props){
		super(props);
		this.state={
			pass:'',
			check:false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
	}
	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
		if (this.state.pass === 'pass') {
			alert('Success');
		}
	}
	handleCheck(){
		this.setState({
			check:true
		})
	}
	render() {
		initializeReactGA();
		return (
			<React.Fragment >
				<div  class="h-100 w-100 d-flex flex-column justify-content-center">
					<Row>
						<Col xs="1" className="align-items-start"><FontAwesomeIcon icon={faDesktop} size="5x" /></Col>
						<Col xs="10" className="align-items-center"><DataFlowModal handleCheck={this.handleCheck}/></Col>
						<Col xs="1" className="align-items-end"><FontAwesomeIcon icon={faServer} size="5x" /></Col>
					</Row>
					<Row>
						<Col xs="5" className="align-items-center">
						</Col>
						<Col xs="1" className="align-items-center">
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
						</Col>
						<Col xs="6" className="align-items-center">
						</Col>
					</Row>
					<Row>
						<Col xs="5" className="align-items-center">
						</Col>
						<Col xs="2" className="align-items-center">
							<FontAwesomeIcon icon={faDesktop} size="5x" />
						</Col>
						<Col xs="5" className="align-items-center">
						</Col>
					</Row>
					<br />
					<Row>
						<Col xs="1">
						</Col>
						<Col xs='2'>
								{this.state.check === true ? <TypedReact content='Your Passcode is:01010010100' /> : ''}
						</Col>
					</Row>
					<br />
					<Row>
						<Col xs="1">
						</Col>
						<Col xs="10">
							<Form>
								<FormGroup>
									<Input value={this.state.pass} onChange={this.handleChange} type="password" name="pass" placeholder="Pascode" />
								</FormGroup>
							</Form>
						</Col>
					</Row>
				</div>
			</React.Fragment>
		)
	}
}