import React, { Component } from 'react';
import { Row, Col, Input, Form, FormGroup, NavLink, Modal, ModalBody, ModalHeader, Button, Spinner,Label } from 'reactstrap';
import ReactGA from 'react-ga';
import RoomFour from 'assets/images/level6/levelsix.jpg'
import PhpLogo from 'assets/images/level7/download.jpg'
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'


function initializeReactGA() {
	ReactGA.initialize(process.env.REACT_APP_GA_ID);
	ReactGA.pageview('/levelseven');
}

class PhpMyAdmin extends Component{

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			isLoggedIn: false,
			msg: "",
			visible: true
		};
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleInput(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}
	handleSubmit(event) {
		event.preventDefault();
	}

	render(){
		return(
			<Form onSubmit={this.handleSubmit} className="d-flex flex-column align-items-center" style={{ color: "black"}}>
						<FormGroup>
							<Label>
								Username:
							</Label>
							<Input
								className="form-control"
								name="username"
								onChange={this.handleInput}
								value={this.state.username}
								type="username"
								required
								style={{ background:"white", borderColor: "black"}}
								// onFocus={()=>{this.style.borderColor="black"}}
							/>
						</FormGroup>
						<FormGroup controlId="formBasicPassword">
							<Label>
								Password:
							</Label>
							<Input
								name="password"
								onChange={this.handleInput}
								value={this.state.password}
								type="password"
								required
								style={{ background: "white", borderColor: "black" }}
							/>
						</FormGroup>
						<Button style={{ background: "grey", borderColor: "black",color:"black" }} type="submit">Go</Button>
					</Form>
		)
	}
}

export default class LevelSeven extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phpmyadmin: false,
			pass: '',
			modal: false,
			window: false,
			loading: false,
			posX:0,
			posy:0,
		};

		this.toggle = this.toggle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.toggleWindow = this.toggleWindow.bind(this);
		let item = null;
		let check = false;
		document.addEventListener('dragstart', function (e) {
			item = e.target;
			e.dataTransfer.setData('text', '');
			if(item.id === "torch"){
				check = true;
			}
		}, false);

		document.addEventListener('dragover', function (e) {
			if (e.target.getAttribute('data-draggable') === 'target'  && check) {
				console.log(e.clientX,e.clientY);
				e.preventDefault();
			}
		}, false);

		document.addEventListener('drop', function (e) {
			if (e.target.getAttribute('data-draggable') === 'target' && item.id === "torch") {
				check = false;
			}
		}, false);
	}
	componentDidMount() {
		this.props.changeNavigation(7)
	}
	toggle() {
		this.setState(prevState => ({
			phpmyadmin: !prevState.phpmyadmin
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
				levelId: 7,
				password: "closed"
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
				if (error.response.data.message === "Auth failed. Please Login.") {
					this.props.history.push("/");
				}
			});
		event.preventDefault();
	}
	render() {
		initializeReactGA();
		if (this.state.phpmyadmin === false) {
			return (
				<React.Fragment>
					<div class="d-flex justify-content-center align-items-center">
						<img data-draggable="target" src={RoomFour} alt='Room Four' useMap='#image-door' />
						<map name="image-door">
							{/* <area alt="door" title="door" coords="825,279,825,512,878,541,877,271" shape="poly" onClick={this.toggle} /> */}
							<area id="Switch" alt="switch" title="Switch" coords="624,410,24" shape="circle" onClick={this.toggle} />
						</map>
					</div>
					<Modal isOpen={this.state.modal} centered toggle={this.toggleModal}>
						<ModalHeader className="d-flex justify-content-center align-items-center">Door key pressed</ModalHeader>
						<ModalBody className="d-flex justify-content-center align-items-center">
							<Form onSubmit={this.handleSubmit}>
								<Button color="success" disabled={this.state.loading} type="submit" className="success text-white">{this.state.loading?<Spinner /> :""} Proceed</Button>&nbsp;
								<Button color="danger" onClick={this.toggleModal} className="danger text-white">Cancel</Button>
							</Form>
						</ModalBody>
					</Modal>
				</React.Fragment>
			)
		}
		else{
			return(
				<div class="h-100 w-100 p-4 d-flex flex-column justify-content-center" style={{background:"white"}}>
					<Row className="p-6 h-100 w-100 d-flex justify-content-center align-self-center">
						<Col className="h-100 w-100 d-flex justify-content-center align-items-center">
							<img src={PhpLogo} alt='' useMap='#image-door' />
						</Col>
					</Row>
					<Row className="h-100 w-100  d-flex align-items-center" >
						<Col className="h-100 w-100">
							<PhpMyAdmin />
							<NavLink className="back-button" onClick={() => { this.setState({ phpmyadmin: false }) }}>
								<FontAwesomeIcon icon={faChevronCircleLeft} size="1x" title="Back" style={{color:"black"}}></FontAwesomeIcon>
							</NavLink>
						</Col>
					</Row>
				</div>
			)
		}
	}
}
