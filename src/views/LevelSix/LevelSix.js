import React, { Component } from 'react';
import { Form, Modal, ModalBody, ModalHeader, Button, Spinner } from 'reactstrap';
import ReactGA from 'react-ga';
import RoomFour from 'assets/images/level6/levelsix.jpg'
import axios from 'axios';
import { toast } from 'react-toastify';


function initializeReactGA() {
	ReactGA.initialize(process.env.REACT_APP_GA_ID);
	ReactGA.pageview('/levelsix');
}


export default class LevelSix extends Component {
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
		this.props.changeNavigation(6)
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
				levelId: 6,
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
					this.props.history.push("/dashboard");
				}
			});
		event.preventDefault();
	}
	render() {
		initializeReactGA();
		if (this.state.terminal === false) {
			return (
				<React.Fragment>
					<div class="d-flex justify-content-center align-items-center">
						<img src={RoomFour} alt='Room Four' useMap='#image-door' />
						<map name="image-door">
							{/* <area alt="door" title="door" coords="825,279,825,512,878,541,877,271" shape="poly" onClick={this.toggle} /> */}
							<area id="Switch" alt="switch" title="Switch" coords="624,410,24" shape="circle" onClick={this.toggleModal} />
							<area id="Exit" alt="door1" title="Exit" coords="72,308,74,615,118,578,116,310" shape="poly" />
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
	}
}
