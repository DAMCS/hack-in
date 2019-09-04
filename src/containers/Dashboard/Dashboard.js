import React, { Component } from 'react';
import {
	Col, Row, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button, Collapse, Badge
} from 'reactstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSatelliteDish, faTable, faSignOutAlt, faAngleLeft, faIdCard, faVideo, faMap, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Redirect, Route, Switch } from "react-router-dom";
import ReactGA from 'react-ga';

function initializeReactGA() {
	ReactGA.initialize('UA-104887157-5');
	ReactGA.pageview('/dashboard');
}

const Announcement = React.lazy(() => import('../../components/Announcement/Announcement'));
const Inventory = React.lazy(() => import('../..//components/Inventory/Inventory'));
const LeaderBoard = React.lazy(() => import('../../components/LeaderBoard'));
const StoryLine = React.lazy(() => import('../../components/StoryLine'));
const MissionMap = React.lazy(() => import('../../components/MissionMap'));
const LevelThree = React.lazy(() => import('../../views/LevelThree'));
const LevelOne = React.lazy(() => import('../../views/LevelOne'));
const LevelTwo = React.lazy(() => import('../../views/LevelTwo'));

const storyLineGIF = require('assets/images/story_line/story.gif');

library.add(faSatelliteDish, faTable, faSignOutAlt, faAngleLeft, faIdCard, faVideo, faAngleRight)

export const Tool = class Tip extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			tooltipOpen: false
		};
	}
	toggle() {
		this.setState({
			tooltipOpen: !this.state.tooltipOpen
		});
	}

}

export default class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.handleLogout = this.handleLogout.bind(this);
		this.toggle = this.toggle.bind(this);
		this.toggleAnnouncement = this.toggleAnnouncement.bind(this);

		this.state = {
			isLoggedIn: true,
			LeaderBoard: false,
			Contact: false,
			Announcements: false,
			Inventory: false,
			StoryLine: false,
			announcement: [],
			seen: 0,
		}
	}
	componentDidMount() {
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
				if (response.data.storySeen === false) {
					this.setState({
						StoryLine: true,
					})
				}
			}).catch(error => {
				this.setState({ isLoggedIn: false })
			})
		}
		else {
			this.setState({ isLoggedIn: false })
		}
		axios.get('/api/announcement', {
			headers: {
				"Authorization": "Bearer " + token
			}
		})
			.then((res) => {
				this.setState({
					announcement: res.data.data.announcements,
					seen: res.data.data.seen
				});
			})
			.catch(function (error) {
				console.log(error);
			})
	}

	render() {
		initializeReactGA();
		if (this.state.isLoggedIn === false) {
			return (<Redirect to="/" />)
		} else {
			return (
				<React.Fragment>
					<Row className="h-100 d-flex justify-content-between">
						<Col xs="1" className="h-100 d-flex flex-column left-nav">
							<Nav pills className="d-flex flex-column justify-content-start">
								<NavItem>
									<NavLink onClick={this.toggle('Announcements')} className="d-flex justify-content-center align-items-center">
										<FontAwesomeIcon icon={faSatelliteDish} size="2x" title="Announcements" />
										{this.state.announcement.length > this.state.seen ? (<React.Fragment>&nbsp;
											<Badge color="primary">{this.state.announcement.length - this.state.seen}</Badge>
										</React.Fragment>) : (<React.Fragment><Badge class="align-self-start text-danger">{this.state.announcement.length - this.state.seen}</Badge>
										</React.Fragment>)}
									</NavLink>
									<Modal centered="true" isOpen={this.state.Announcements} toggle={this.toggle('Announcements')} className="modal-lg">
										<ModalHeader>Announcements</ModalHeader>
										<ModalBody className="container-fluid mw-100">
											<Announcement announcement={this.state.announcement} seen={this.state.seen} />
										</ModalBody>
										<ModalFooter>
											<Button color="danger text-white" onClick={this.toggleAnnouncement}>Close</Button>
										</ModalFooter>
									</Modal>
								</NavItem>
								<NavItem>
									<NavLink onClick={this.toggle("LeaderBoard")}>
										<FontAwesomeIcon icon={faTable} size="2x" title="Leaderboard" />
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
										<FontAwesomeIcon icon={faVideo} size="2x" title="StoryLine" />
										<Modal isOpen={this.state.StoryLine} toggle={this.toggle('StoryLine')} className="modal-lg">
											<ModalHeader> <img alt="Story" width="100%" src={storyLineGIF} /></ModalHeader>
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
									<NavLink onClick={() => { this.props.history.push('/dashboard') }}>
										<FontAwesomeIcon icon={faMap} size="2x" title="Lab Map" />
									</NavLink>
								</NavItem>
								<NavItem className="d-flex">
									<NavLink onClick={this.toggle('Contact')}>
										<FontAwesomeIcon icon={faIdCard} size="2x" title="Contact" />
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
										<FontAwesomeIcon icon={faSignOutAlt} size="2x" title="Sign Out" />
									</NavLink>
								</NavItem>
							</Nav>
						</Col>
						<Col xs="10" className="h-100 w-100 mx-auto my-auto d-flex justify-content-center align-items-center">
							{/* Routing dashboard containers! */}
							<Switch>
								<Route exact path={this.props.match.path} name="MissionMap" render={props => <MissionMap {...props} />} />
								<Route path={`${this.props.match.path}/levelthree`} name="LevelThree" render={props => <LevelThree {...props} />} />
								<Route path={`${this.props.match.path}/levelone`} name="LevelOne" render={props => <LevelOne {...props} />} />
								<Route path={`${this.props.match.path}/leveltwo`} name="LevelTwo" render={props => <LevelTwo {...props} />} />
							</Switch>
						</Col>
						<Col xs="1" className="h-100 d-flex justify-content-center align-items-center right-nav">
							<Nav pills>
								<NavItem >
									<NavLink onClick={this.toggle('Inventory')}>
										<FontAwesomeIcon icon={this.state.Inventory ? faAngleRight : faAngleLeft} size="2x" />
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

	toggleAnnouncement() {
		this.setState({
			seen: this.state.announcement.length,
			Announcements: !this.state.Announcements
		})
	}
	toggle = modal => ev => {
		ReactGA.modalview('/dashboard/' + modal);
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

}