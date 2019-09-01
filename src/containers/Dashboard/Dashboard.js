import React, { Component } from 'react';
import {
	Col, Row, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button, Collapse, Spinner
} from 'reactstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSatelliteDish, faTable, faSignOutAlt, faAngleLeft, faIdCard, faVideo, faMap } from '@fortawesome/free-solid-svg-icons'
import { Redirect, Route, BrowserRouter, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import ReactGA from 'react-ga';

function initializeReactGA() {
	ReactGA.initialize('UA-104887157-5');
	ReactGA.pageview('/dashboard');
}
function Loading() {
	return (
		<div class="d-flex justify-content-center align-items-center">
			Loading...
		</div>
	);
}
const Announcement = React.lazy(() => import('../../components/Announcement/Announcement'));
const Inventory = React.lazy(() => import('../..//components/Inventory/Inventory'));
const LeaderBoard = React.lazy(() => import('../../components/LeaderBoard'));
const StoryLine = React.lazy(() => import('../../components/StoryLine'));
const MissionMap = React.lazy(() => import('../../components/MissionMap'));
const LevelThree = React.lazy(() => import('../../views/LevelThree'));
const LevelOne = React.lazy(() => import('../../views/LevelOne'));
const LevelTwo = React.lazy(() => import('../../views/LevelTwo'));
library.add(faSatelliteDish, faTable, faSignOutAlt, faAngleLeft, faIdCard, faVideo)

export default class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.handleLogout = this.handleLogout.bind(this);
		this.toggle = this.toggle.bind(this);

		this.state = {
			isLoggedIn: true,
			LeaderBoard: false,
			Contact: false,
			Announcements: false,
			Inventory: false,
			StoryLine: false,
		}
	}

	toggle = modal => ev => {
		ReactGA.modalview('/dashboard/'+modal);
		this.setState(prevState => ({ [modal]: !prevState[modal] }))
	}

	handleLogout() {
		localStorage.removeItem('token');
		this.setState({ isLoggedIn: false });
		ReactGA.event({
			category: 'User',
			action: 'User Logged Out',
			time: new Date()
		});
		this.props.history.push('/')
	}

	componentWillMount() {
		let token = localStorage.getItem("token");
		if (token) {
			axios({
				method: "get",
				url: "/api/user",
				headers: {
					Authorization: "Bearer " + token
				}
			}).then(response => {
				if (response.data.status === "Success") {
					console.log(response.data);
					this.setState({ isLoggedIn: true })
				}
			}).catch(error => {
				this.setState({ isLoggedIn: false })
			})
		}
		else {
			this.setState({ isLoggedIn: false })
		}
	}

	componentDidMount() {

	}
	render() {
		initializeReactGA();
		if (this.state.isLoggedIn === false) {
			return (<Redirect to="/" />)
		} else {
			return (
				<React.Fragment>
					<Row className="h-100 d-flex justify-content-between">
						<Col xs="1" className="h-100 d-flex flex-column">
							<Nav pills className="d-flex flex-column justify-content-start">
								<NavItem>
									<NavLink onClick={this.toggle('Announcements')}									>
										<FontAwesomeIcon icon={faSatelliteDish} size="2x" />
									</NavLink>
									<Modal centered="true" isOpen={this.state.Announcements} toggle={this.toggle('Announcements')} className="modal-lg">
										<ModalHeader>Announcements</ModalHeader>
										<ModalBody className="container-fluid mw-100">
											<Announcement />
										</ModalBody>
										<ModalFooter>
											<Button color="danger text-white" onClick={this.toggle('Announcements')}>Close</Button>
										</ModalFooter>
									</Modal>
								</NavItem>
								<NavItem>
									<NavLink onClick={this.toggle("LeaderBoard")}>
										<FontAwesomeIcon icon={faTable} size="2x" />
										<Modal centered="true" isOpen={this.state.LeaderBoard} toggle={this.toggle('LeaderBoard')} className="modal-lg">
											<ModalHeader>LeaderBoard</ModalHeader>
											<ModalBody className="container-fluid mw-100">
												<LeaderBoard />
											</ModalBody>
											<ModalFooter>
												<Button color="danger text-white" onClick={this.toggle('LeaderBoard')}>Close</Button>
											</ModalFooter>
										</Modal>
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink onClick={this.toggle('StoryLine')}>
										<FontAwesomeIcon icon={faVideo} size="2x" />
										<Modal isOpen={this.state.StoryLine} toggle={this.toggle('StoryLine')} className="modal-lg">
											< ModalHeader > <img alt="Story" width="100%" src={require('../../components/StoryLine/story.gif')} /></ModalHeader>
											<ModalBody>
												<StoryLine />
											</ModalBody>
											<ModalFooter>
												<Button color="danger text-white" onClick={this.toggle('StoryLine')}>Skip</Button>
											</ModalFooter>
										</Modal>
									</NavLink>
								</NavItem>
							</Nav>
							
							<Nav pills className="d-flex flex-column justify-content-end mt-auto">
								<NavItem className="d-flex">
									<NavLink onClick={() => this.props.history.push('/')}>
										<FontAwesomeIcon icon={faMap} size="2x"/>
									</NavLink>
								</NavItem>
								<NavItem className="d-flex">
									<NavLink onClick={this.toggle('Contact')}>
										<FontAwesomeIcon icon={faIdCard} size="2x" />
										<Modal centered="true" isOpen={this.state.Contact} toggle={this.toggle('Contact')} className="modal-lg">
											<ModalHeader>Contact</ModalHeader>
											<ModalBody>
												<div class="p-2 mx-auto">
													Co-ordinator : Surya Prasath S<br />
													Email : hackin2019@gmail.com<br />
													Phone : 9791745977<br />
												</div>
											</ModalBody>
											<ModalFooter>
												<Button color="danger text-white" onClick={this.toggle('Contact')}>Close</Button>
											</ModalFooter>
										</Modal>
									</NavLink>
								</NavItem>
								<NavItem className="d-flex ">
									<NavLink onClick={this.handleLogout}>
										<FontAwesomeIcon icon={faSignOutAlt} size="2x" />
									</NavLink>
								</NavItem>
							</Nav>
						</Col>
						<Col xs="10" className="h-100 d-flex mx-auto my-auto align-self-center">
							<BrowserRouter history={createBrowserHistory()} >
								<React.Suspense fallback={<Loading />}>
									<Switch>
										<Route exact path="/levelthree" name="LevelThree" render={props => <LevelThree {...props} />} />
										<Route exact path="/levelone" name="LevelOne" render={props => <LevelOne {...props} />} />
										<Route exact path="/leveltwo" name="LevelTwo" render={props => <LevelTwo {...props} />} />
										<Route path="/" name="MissionMap" render={props => <MissionMap {...props} />} />
									</Switch>
								</React.Suspense>
							</ BrowserRouter>
							{/* <MissionMap /> */}
						</Col>
						<Col xs="1" className="d-flex justify-content-center align-items-center">
							<Nav pills>
								<NavItem >
									<NavLink onClick={this.toggle('Inventory')}>
										<FontAwesomeIcon icon={faAngleLeft} size="2x" />
									</NavLink>
								</NavItem>
							</Nav>
							<Collapse isOpen={this.state.Inventory} className="navbar-collapse">
								<Inventory />
							</Collapse>
						</Col>
					</Row>
				</React.Fragment >
			)
		}
	}
}