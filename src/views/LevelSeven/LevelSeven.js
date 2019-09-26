import React, { Component } from 'react';
import { Row, Col, Input, Form, FormGroup, NavLink, Modal, ModalBody, ModalHeader, Button, Spinner,Label, Table } from 'reactstrap';
import ReactGA from 'react-ga';
import RoomSeven from 'assets/images/level7/levelseven.jpg'
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
			visible: true,
			loading: false
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
		this.setState({loading: true});
		axios({
			method: "post",
			url: "/api/level/checkuser",
			headers: {
				Authorization: "Bearer " + localStorage.getItem('token')
			},
			data: {
				uname: this.state.username,
				password: this.state.password
			}
		})
			.then(response => {
				if (response.data.status === "Success") {
					this.setState({isLoggedIn:true})
				}
				this.setState({loading: false});
			})
			.catch(error => {
				toast.error("Try different authentication!");
				this.setState({loading: false});
			});
		// this.setState({isLoggedIn:true});
		event.preventDefault();
	}

	render(){
		if (this.state.isLoggedIn === false) {
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
									style={{ background:"white", borderColor: "black", color: "black"}}
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
									style={{ background: "white", borderColor: "black", color: "black" }}
								/>
							</FormGroup>
							<Label>Can't Escape? We also did't!</Label>
							<Button disabled={this.state.loading} style={{ background: "grey", borderColor: "black",color:"black" }} type="submit">{this.state.loading?<Spinner /> :""} Go</Button>
						</Form>
			)
		} else {
			return (<Table style={{color: "black"}}>
				<thead>
				  <tr>
					<th>#</th>
					<th>Nick Name</th>
					<th>Key</th>
				  </tr>
				</thead>
				<tbody>
				  <tr>
					<th scope="row">1</th>
					<td>Schwar</td>
					<td>alohomora</td>
				  </tr>
				</tbody>
			  </Table>
			  );
		}
	}
}

let base_image = new Image();
var oImageWidth = 1488;
var oImageHeight = 719;
var oPanelHeight = 50;
var oPanelWidth = 45;
var aTopOffset = 450;
var aLeftOffset = 120;
var topOffset;
var leftOffset;
var aPanelHeight = oPanelHeight;
var aPanelWidth = oPanelWidth;
function PositionPushCanvas(){
	//Now get the screen size
	var can = document.getElementById("myCanvas");
	var rect = can.getBoundingClientRect()
    var windowWidth = can.width;
	var windowHeight = can.height;
	// console.log(rect)

	aPanelHeight = ((oPanelHeight - rect.top) * (windowHeight / oImageHeight)) + rect.y;
	aPanelWidth = ((oPanelWidth - rect.left ) * (windowWidth / oImageWidth)) + rect.x;

    //Placement.
    topOffset = ((aTopOffset  - rect.top) * (windowHeight / oImageHeight)) + rect.y;
    leftOffset = ((aLeftOffset - rect.left) * (windowWidth / oImageWidth)) + rect.x;
}

function  getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect(), // abs. size of element
		scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
		scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
		var tx = (event.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
		ty = (event.clientY - rect.top) * scaleY ;   // been adjusted to be relative to element
		//console.log(rect, scaleX, scaleY);
		  return {
		  x: tx+rect.x,   // scale mouse coordinates after they have
		  y: ty+rect.y     // been adjusted to be relative to element
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
			canvas: true,
			can: null,
		};

		this.toggle = this.toggle.bind(this);
		this.redraw = this.redraw.bind(this);
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
				console.log(check);
			}
		}, false);

		document.addEventListener('dragover', e => {
			if (e.target.getAttribute('data-draggable') === 'target'  && this.state.canvas && check) {
				// console.log(e.clientX,e.clientY);
				var can = document.getElementById("myCanvas");
				var mouse = getMousePos(can, e)
				this.redraw(mouse);
				PositionPushCanvas();
				e.preventDefault();
			}
		}, false);

		document.addEventListener('drop', e => {
			if (this.state.canvas) {
				var can = document.getElementById("myCanvas");
				var mouse = getMousePos(can, e)
				var x = mouse.x;
				var y = mouse.y;
				console.log(topOffset, aPanelHeight, leftOffset, aPanelWidth, y, x);
				if ((y >= topOffset && y < topOffset + aPanelHeight)&& (x>=leftOffset && x < leftOffset+aPanelWidth) ) {
					console.log('yesss');
					check = false;
					this.setState({canvas:false})
				}
			
				// if (e.target.getAttribute('data-draggable') === 'target' && item.id === "torch") {
				// 	check = false;
				// }
			}
		}, false);

		document.addEventListener('dragend', e => {
			if (this.state.canvas)
				this.redraw({x:0, y:0})
	
		}, false);
	}
	componentDidMount() {
		this.props.changeNavigation(7)
		//this.redraw({x:493, y:377});
		var can = document.getElementById("myCanvas");
		// var base_image = new Image();
		// base_image.src = RoomFour;
		can.style.width ='100%';
		can.style.height='100%';
		base_image.src = RoomSeven;
		//ctx.drawImage(base_image, 0, 0,base_image.width,base_image.height,0,0,can.width,can.height);
		this.setState({canvas: true})
	}

	redraw(mouse) {
		var can = document.getElementById("myCanvas");
		var ctx = can.getContext("2d");
		can.width  = can.offsetWidth;
		can.height = can.offsetHeight;
		ctx.drawImage(base_image, 0, 0,base_image.width,base_image.height,0,0,can.width,can.height);
		ctx.beginPath();
		ctx.rect(0,0,can.width,can.height);
		ctx.arc(mouse.x-110, mouse.y, 50, 0, Math.PI*2, true)
		ctx.clip();
		// ctx.fillStyle = "red";
		ctx.fillRect(0,0,can.offsetWidth,can.offsetHeight);	
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
				if (error.response.data.message === "Auth failed. Please Login.") {
					this.props.history.push("/");
				}
			});
		event.preventDefault();
	}
	render() {
		initializeReactGA();
		if (this.state.canvas === true) {
			return (
				<canvas id="myCanvas" data-draggable="target" style={{"height":"400px", "widht":"400px", "background-color":"#000"}}></canvas>
			)
		} else {
			if (this.state.phpmyadmin === false) {
				return (
					<React.Fragment>
						<div class="d-flex justify-content-center align-items-center">
							<img data-draggable="target" src={RoomSeven} alt='Room Seven' useMap='#image-door' />
							<map name="image-door">
								<area alt="door" title="door"  coords="176,312,295,520" shape="rect" onClick={this.toggleModal} />
								<area id="PC" alt="pc" title="PC" coords="365,393,416,427" shape="rect" onClick={this.toggle} />
							</map>
						</div>
						<Modal isOpen={this.state.modal} centered toggle={this.toggleModal}>
							<ModalHeader className="d-flex justify-content-center align-items-center">Enter Passcode</ModalHeader>
							<ModalBody className="d-flex justify-content-center align-items-center">
								<Form onSubmit={this.handleSubmit}>
									<FormGroup>
										<Input value={this.state.pass} onChange={this.handleChange} type="password" name="pass" placeholder="passcode" />
									</FormGroup>
									<Button color="success" disabled={this.state.loading} type="submit" className="success text-white">{this.state.loading?<Spinner /> :""} Submit</Button>&nbsp;
									<Button color="danger" onClick={this.toggleModal} className="danger text-white">Close</Button>
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
						<NavLink className="back-button" onClick={() => { this.setState({ phpmyadmin: false }) }}>
							<FontAwesomeIcon icon={faChevronCircleLeft} size="1x" title="Back" style={{color:"black"}}></FontAwesomeIcon>
						</NavLink>
						<Row className="h-100 w-100  d-flex align-items-center" >
							<Col className="h-100 w-100">
								<PhpMyAdmin />
							</Col>
						</Row>
					</div>
				)
			}

		}
	}
}
