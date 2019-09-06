import React, { Component } from 'react';
import {
	Col, Row, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button, Collapse, Badge
} from 'reactstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSatelliteDish, faTable, faSignOutAlt, faAngleLeft, faIdCard, faVideo, faMap, faAngleRight, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { Redirect, Route, Switch } from "react-router-dom";
import ReactGA from 'react-ga';
import { toast } from 'react-toastify';

function initializeReactGA() {
	ReactGA.initialize('UA-104887157-5');
	ReactGA.pageview('/dashboard');
}

const Announcement = React.lazy(() => import('components/Announcement/Announcement'));
const Inventory = React.lazy(() => import('components/Inventory/Inventory'));
const LeaderBoard = React.lazy(() => import('components/LeaderBoard'));
const StoryLine = React.lazy(() => import('components/StoryLine'));
const MissionMap = React.lazy(() => import('components/MissionMap'));
const LevelThree = React.lazy(() => import('views/LevelThree'));
const LevelOne = React.lazy(() => import('views/LevelOne'));
const LevelTwo = React.lazy(() => import('views/LevelTwo'));
const Page404 = React.lazy(() => import('views/Pages/Page404'))

const storyLineGIF = require('assets/images/story_line/story.gif');

library.add(faSatelliteDish, faTable, faSignOutAlt, faAngleLeft, faIdCard, faVideo, faAngleRight, faLightbulb)

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

		this.getLevel = this.getLevel.bind(this);
		this.hintBuy = this.hintBuy.bind(this);
		this.toggleHint = this.toggleHint.bind(this);
		this.updateHint = this.updateHint.bind(this);
		this.changeNavigation = this.changeNavigation.bind(this);
		this.state = {
			isLoggedIn: true,
			LeaderBoard: false,
			Contact: false,
			Announcements: false,
			Inventory: false,
			StoryLine: false,
			announcement: [],
			seen: 0,
			level: [],
			Hint: false,
			currentLevel: 0,
			hints: [],
			navigation: 0
		}
	}
	changeNavigation(level) {
		this.setState({
			navigation: level
		})
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
		axios({
			method: 'get',
			url: '/api/level/all',
			headers: {
				Authorization: "Bearer " + token
			}
		})
			.then(response => {
				console.log(response.data);
				this.setState({
					level: response.data.data
				})
			})
			.catch(function (error) {
				console.log(error);
			});
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
									<NavLink href="#" onClick={this.toggle('Announcements')} className="d-flex justify-content-start align-items-center">
										<FontAwesomeIcon icon={faSatelliteDish} size="2x" title="Announcements" />
										{this.state.announcement.length > this.state.seen ? (<React.Fragment>&nbsp;
											<Badge color="primary">{this.state.announcement.length - this.state.seen}</Badge>
										</React.Fragment>) : (<React.Fragment></React.Fragment>)}
									</NavLink>
									<Modal centered isOpen={this.state.Announcements} toggle={this.toggle('Announcements')} className="modal-lg">
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
									<NavLink href="#" onClick={this.toggle("LeaderBoard")} className="d-flex justify-content-start align-items-center">
										<FontAwesomeIcon icon={faTable} size="2x" title="Leaderboard" />
										<Modal centered isOpen={this.state.LeaderBoard} toggle={this.toggle('LeaderBoard')} className="modal-lg">
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
									<NavLink href="#" onClick={this.toggle('StoryLine')} className="d-flex justify-content-start align-items-center">
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
								<NavItem>{
									this.state.navigation !== 0 ?
										<NavLink href="#" onClick={this.toggleHint}>
											<FontAwesomeIcon icon={faLightbulb} size="2x" />
											<Modal isOpen={this.state.Hint} toggle={this.toggle('Hint')} className="modal-lg">
												<ModalHeader >Hint</ModalHeader>
												<ModalBody>
													{this.state.hints.length !== 0 ? (<React.Fragment></React.Fragment>) : (<div>You haven't bought any hints!</div>)}
													{this.state.hints.map((object, index) => {
														return (<React.Fragment><div>{object.hintMsg}<br /></div></React.Fragment>)
													})}
												</ModalBody>
												<ModalFooter>
													<Button color="danger text-white" onClick={this.toggle('Hint')}>Close</Button>
													<Button color="success text-white" onClick={this.hintBuy}>Buy</Button>
												</ModalFooter>
											</Modal>
										</NavLink> : <React.Fragment></React.Fragment>}
								</NavItem>
							</Nav>
							<Nav pills className="d-flex flex-column justify-content-end mt-auto">
								<NavItem className="d-flex">
									<NavLink href="#" onClick={() => { this.props.history.push('/dashboard') }}>
										<FontAwesomeIcon icon={faMap} size="2x" title="Lab Map" />
									</NavLink>
								</NavItem>
								<NavItem className="d-flex">
									<NavLink href="#" onClick={this.toggle('Contact')}>
										<FontAwesomeIcon icon={faIdCard} size="2x" title="Contact" />
										<Modal centered isOpen={this.state.Contact} toggle={this.toggle('Contact')} className="modal-lg">
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
									<NavLink href="#" onClick={this.handleLogout}>
										<FontAwesomeIcon icon={faSignOutAlt} size="2x" title="Sign Out" />
									</NavLink>
								</NavItem>
							</Nav>
						</Col>
						<Col xs="10" className="h-100 w-100 mx-auto my-auto d-flex justify-content-center align-items-center">
							{/* Routing dashboard containers! */}
							<Switch>
								{this.state.level.map((level, index) => {
									if (level.levelId === 1) {
										return (<Route exact path={`${this.props.match.path}/levelone`} key="1" name="LevelOne" render={props => <LevelOne {...props} changeNavigation={this.changeNavigation} />} />)
									}
									else if (level.levelId === 2) {
										return (<Route exact path={`${this.props.match.path}/leveltwo`} key="2" name="LevelTwo" render={props => <LevelTwo {...props} changeNavigation={this.changeNavigation} />} />)
									}
									else if (level.levelId === 3) {
										return (<Route exact path={`${this.props.match.path}/levelthree`} key="3" name="LevelThree" render={props => <LevelThree {...props} changeNavigation={this.changeNavigation} />} />)
									}
								})}
								<Route exact path={`${this.props.match.path}`} name="MissionMap" key="0" render={props => <MissionMap {...props} getLevel={this.getLevel} changeNavigation={this.changeNavigation} />} />
								<Route key="-1" component={Page404} />
							</Switch>
						</Col>
						<Col xs="1" className="h-100 d-flex justify-content-center align-items-center right-nav">
							<Nav pills>
								<NavItem >
									<NavLink href="#" onClick={this.toggle('Inventory')}>
										<FontAwesomeIcon icon={this.state.Inventory ? faAngleRight : faAngleLeft} size="2x" />
									</NavLink>
								</NavItem>
							</Nav>
							<Collapse isOpen={this.state.Inventory} className="navbar-collapse">
								<Inventory />
							</Collapse>
						</Col>
					</Row>
				</React.Fragment>
			)
		}
	}

	updateHint() {
		// console.log(this.state.navigation);
		let token = localStorage.getItem("token");
		axios({
			method: "post",
			url: "/api/hint",
			headers: {
				Authorization: "Bearer " + token
			},
			data: {
				levelId: this.state.currentLevel
			}
		}).then(response => {
			console.log(response.data);
			this.setState({
				hints: response.data.data,
			})
		}).catch(error => {
			console.log(error);
		})
	}
	toggleHint() {
		this.setState({
			Hint: !this.state.Hint
		})
		this.updateHint();
	}

	getLevel(level) {
		this.setState({
			currentLevel: level
		})
	}

	hintBuy() {
		axios({
			method: "post",
			url: "/api/hint/buy",
			headers: {
				Authorization: "Bearer " + localStorage.getItem('token')
			},
			data: {
				levelId: this.state.currentLevel,
				hintId: this.state.hints.length + 1
			}
		})
			.then((response) => {
				if (response.data.status === "Success") {
					toast.success("Bought a hint!");
					this.updateHint();
				}
				else if (response.data.status === "Error") {
					toast.error("You cannot buy anymore hints!");
				}
			})
			.catch((err) => {
				toast.error("Internal Error");
			})
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