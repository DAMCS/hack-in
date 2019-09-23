import React, { Component } from 'react';
import {
	Col, Row, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button, Collapse, Badge, Tooltip
} from 'reactstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSatelliteDish, faTable, faSignOutAlt, faAngleLeft, faIdCard, faVideo, faMap, faAngleRight, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { Redirect, Route, Switch } from "react-router-dom";
import ReactGA from 'react-ga';
import { toast } from 'react-toastify';
import Loading from 'components/Loading';

function initializeReactGA() {
	ReactGA.initialize(process.env.REACT_APP_GA_ID);
	ReactGA.pageview('/dashboard');
}

const Announcement = React.lazy(() => import('components/Announcement/Announcement'));
const Inventory = React.lazy(() => import('components/Inventory/Inventory'));
const LeaderBoard = React.lazy(() => import('components/LeaderBoard'));
const StoryLine = React.lazy(() => import('components/StoryLine'));
const MissionMap = React.lazy(() => import('components/MissionMap'));
const LevelOne = React.lazy(() => import('views/LevelOne'));
const LevelTwo = React.lazy(() => import('views/LevelTwo'));
const LevelThree = React.lazy(() => import('views/LevelThree'));
const LevelFour = React.lazy(() => import('views/LevelFour'));
const LevelFive = React.lazy(() => import('views/LevelFive'));
const LevelSix = React.lazy(() => import('views/LevelSix'));
const LevelSeven = React.lazy(() => import('views/LevelSeven'));
const LevelEight = React.lazy(() => import('views/LevelEight'));
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
		this.updateUserCompletion = this.updateUserCompletion.bind(this);

		this.getLevel = this.getLevel.bind(this);
		this.hintBuy = this.hintBuy.bind(this);
		this.toggleHint = this.toggleHint.bind(this);
		this.updateHint = this.updateHint.bind(this);
		this.changeNavigation = this.changeNavigation.bind(this);
		this.toggleAnntooltip = this.toggleAnntooltip.bind(this);
		this.togglelbtooltip = this.togglelbtooltip.bind(this);
		this.togglesltooltip = this.togglesltooltip.bind(this);
		this.togglehinttooltip = this.togglehinttooltip.bind(this);
		this.togglemaptooltip = this.togglemaptooltip.bind(this);
		this.togglecontacttooltip = this.togglecontacttooltip.bind(this);
		this.togglelogouttootltip = this.togglelogouttootltip.bind(this);
		this.state = {
			isLoggedIn: true,
			LeaderBoard: false,
			Contact: false,
			Announcements: false,
			Inventory: true,
			StoryLine: false,
			announcement: [],
			seen: 0,
			level: [],
			Hint: false,
			currentLevel: 0,
			hints: [],
			navigation: 0,
			anntooltip: false,
			leaderboardtooltip: false,
			storylinetooltip: false,
			hinttoolip: false,
			maptooltip: false,
			contacttooltip: false,
			logouttooltip: false,
			currentUserLevel: 1
		}
	}
	changeNavigation(level) {
		this.setState({
			navigation: level
		})
	}

	updateUserCompletion() {
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
					//console.log(response.data);
					this.setState({ isLoggedIn: true, currentUserLevel: response.data.currentLevel })
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
				this.setState({
					level: response.data.data
				})
			})
			.catch(error => {
				console.log(error);
				if (error.response.data.message === "Auth failed. Please Login.") {
					this.props.history.push("/");
				}
			});
	}
	componentDidMount() {
		this.updateUserCompletion();
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
									<NavLink href="#" id="ann" onClick={this.toggle('Announcements')} className="d-flex justify-content-start align-items-center">
										<FontAwesomeIcon icon={faSatelliteDish} size="2x" />
										<Tooltip placement="right" isOpen={this.state.anntooltip} target="ann" toggle={this.toggleAnntooltip}>
											Announcement
        								</Tooltip>
										{this.state.announcement.length > this.state.seen ? (<React.Fragment>&nbsp;
											<Badge color="primary">{this.state.announcement.length - this.state.seen}</Badge>
										</React.Fragment>) : (<React.Fragment></React.Fragment>)}
									</NavLink>
									<Modal centered isOpen={this.state.Announcements} toggle={this.toggle('Announcements')} className="modal-lg" responsive>
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
									<NavLink href="#" id="leaderboard" onClick={this.toggle("LeaderBoard")} className="d-flex justify-content-start align-items-center">
										<FontAwesomeIcon icon={faTable} size="2x" />
										<Tooltip placement="right" isOpen={this.state.leaderboardtooltip} target="leaderboard" toggle={this.togglelbtooltip}>
											LeaderBoard
        								</Tooltip>
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
									<NavLink href="#" id="storyline" onClick={this.toggle('StoryLine')} className="d-flex justify-content-start align-items-center">
										<FontAwesomeIcon icon={faVideo} size="2x" />
										<Tooltip placement="right" isOpen={this.state.storylinetooltip} target="storyline" toggle={this.togglesltooltip}>
											StoryLine
        								</Tooltip>
										<Modal isOpen={this.state.StoryLine} toggle={this.toggle('StoryLine')} className="modal-lg">
											<ModalHeader> <img alt="Story" width="765px" style={{ justifyContent: 'center', alignItems: 'center' }} src={storyLineGIF} /></ModalHeader>
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
										<NavLink href="#" id="hint" onClick={this.toggleHint}>
											<FontAwesomeIcon icon={faLightbulb} size="2x" />
											<Tooltip placement="right" isOpen={this.state.hinttooltip} target="hint" toggle={this.togglehinttooltip}>
												Ask Help!
        									</Tooltip>
											<Modal isOpen={this.state.Hint} toggle={this.toggle('Hint')} className="modal-lg">
												<ModalHeader >Hint</ModalHeader>
												<ModalBody>
													{this.state.hints.length !== 0 ? (<React.Fragment></React.Fragment>) : (<div>You haven't bought any hints! If you do, then you will lose credits.</div>)}
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
									<NavLink href="#" id="labmap" onClick={() => { this.props.history.push('/dashboard') }}>
										<FontAwesomeIcon icon={faMap} size="2x" />
										<Tooltip placement="right" isOpen={this.state.maptooltip} target="labmap" toggle={this.togglemaptooltip}>
											Lab Map
        								</Tooltip>
									</NavLink>
								</NavItem>
								<NavItem className="d-flex">
									<NavLink id="contact" href="#" onClick={this.toggle('Contact')}>
										<FontAwesomeIcon icon={faIdCard} size="2x" />
										<Tooltip placement="right" isOpen={this.state.contacttooltip} target="contact" toggle={this.togglecontacttooltip}>
											Contact
        								</Tooltip>
										<Modal centered isOpen={this.state.Contact} toggle={this.toggle('Contact')} className="modal-lg">
											<ModalHeader>Contact</ModalHeader>
											<ModalBody>
												<div class="p-2 mx-auto">
													Co-ordinator : Surya Prasath S<br />
													Email : hackinpsg2019@gmail.com<br />
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
									<NavLink href="#" id="logout" onClick={this.handleLogout}>
										<FontAwesomeIcon icon={faSignOutAlt} size="2x" />
										<Tooltip placement="right" isOpen={this.state.logouttooltip} target="logout" toggle={this.togglelogouttootltip}>
											Logout
        								</Tooltip>
									</NavLink>
								</NavItem>
							</Nav>
						</Col>
						<Col xs="10" className="h-100 w-100 mx-auto my-auto d-flex justify-content-center align-items-center">
							{/* Routing dashboard containers! */}
							<Switch>
								{this.state.level.map((level, index) => {
									if (level.levelId === 1 && level.levelStatus === "open" && level.userLevelStatus === "not completed" && this.state.currentUserLevel === 1) {
										console.log('working 1');
										return (<Route exact path={`${this.props.match.path}/levelone`} key="1" name="LevelOne" render={props => <LevelOne {...props} changeNavigation={this.changeNavigation} />} />)
									}
									else if (level.levelId === 2 && level.levelStatus === "open" && level.userLevelStatus === "not completed" && this.state.currentUserLevel === 2) {
										console.log('working 2');
										return (<Route exact path={`${this.props.match.path}/leveltwo`} key="2" name="LevelTwo" render={props => <LevelTwo {...props} changeNavigation={this.changeNavigation} />} />)
									}
									else if (level.levelId === 3 && level.levelStatus === "open" && level.userLevelStatus === "not completed" && this.state.currentUserLevel === 3) {
										console.log('working 3');
										return (<Route exact path={`${this.props.match.path}/levelthree`} key="3" name="LevelThree" render={props => <LevelThree {...props} changeNavigation={this.changeNavigation} />} />)
									}
									else if (level.levelId === 4 &&  level.levelStatus === "open" && level.userLevelStatus === "not completed" && this.state.currentUserLevel === 4) {
										return (<Route exact path={`${this.props.match.path}/levelfour`} key="4" name="LevelFour" render={props => <LevelFour {...props} changeNavigation={this.changeNavigation} />} />)
									} else if (level.levelId === 5 &&  level.levelStatus === "open" && level.userLevelStatus === "not completed" && this.state.currentUserLevel === 5 ) {
										return (<Route exact path={`${this.props.match.path}/levelfive`} key="5" name="LevelFive" render={props => <LevelFive {...props} changeNavigation={this.changeNavigation} />} />)
									} else if (level.levelId === 6 &&  level.levelStatus === "open" && level.userLevelStatus === "not completed" && this.state.currentUserLevel === 6 ) {
										return (<Route exact path={`${this.props.match.path}/levelsix`} key="6" name="LevelSix" render={props => <LevelSix {...props} changeNavigation={this.changeNavigation} />} />)
									} else if (level.levelId === 7 &&  /* level.levelStatus === "open"  && */ level.userLevelStatus === "not completed" /* && this.state.currentUserLevel === 7 */ ) {
										return (<Route exact path={`${this.props.match.path}/levelseven`} key="7" name="LevelSeven" render={props => <LevelSeven {...props} changeNavigation={this.changeNavigation} />} />)
									} else if (level.levelId === 8 &&  /* level.levelStatus === "open"  && */ level.userLevelStatus === "not completed" /* && this.state.currentUserLevel === 8 */) {
										return (<Route exact path={`${this.props.match.path}/leveleight`} key="7" name="LevelSeven" render={props => <LevelEight {...props} changeNavigation={this.changeNavigation} />} />)
									}
									else {
										console.log('working 0');
										return <Route exact path={`${this.props.match.path}`} name="MissionMap" key="0" render={props => <MissionMap {...props} getLevel={this.getLevel} changeNavigation={this.changeNavigation} />} />
									}
								})}
								{console.log('working -1')}
								<Route key="-1" component={Loading} />
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
		let token = localStorage.getItem("token");
		axios({
			method: "post",
			url: "/api/hint",
			headers: {
				Authorization: "Bearer " + token
			},
			data: {
				levelId: this.state.navigation
			}
		}).then(response => {
			this.setState({
				hints: response.data.data,
			})
		}).catch(error => {
			console.log(error);
			if (error.response.data.message === "Auth failed. Please Login.") {
				this.props.history.push("/");
			}
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
				levelId: this.state.navigation,
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
			.catch(err => {
				toast.error("Internal Error");
				if (err.response.data.message === "Auth failed. Please Login.") {
					this.props.history.push("/dashboard");
				}
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

	toggleAnntooltip() {
		this.setState({
			anntooltip: !this.state.anntooltip
		});
	}

	togglelbtooltip() {
		this.setState({
			leaderboardtooltip: !this.state.leaderboardtooltip
		});
	}

	togglesltooltip() {
		this.setState({
			storylinetooltip: !this.state.storylinetooltip
		});
	}

	togglehinttooltip() {
		this.setState({
			hinttooltip: !this.state.hinttooltip
		});
	}

	togglemaptooltip() {
		this.setState({
			maptooltip: !this.state.maptooltip
		});
	}

	togglecontacttooltip() {
		this.setState({
			contacttooltip: !this.state.contacttooltip
		});
	}

	togglelogouttootltip() {
		this.setState({
			logouttooltip: !this.state.logouttooltip
		});
	}
}
