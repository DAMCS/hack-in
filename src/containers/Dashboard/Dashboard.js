import React, { Component } from 'react';
import {
	Col, Row, Nav, NavItem, NavLink, Popover, PopoverHeader, PopoverBody, Modal, ModalHeader, ModalBody, ModalFooter, Button, Collapse
} from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSatelliteDish, faTable, faSignOutAlt, faAngleLeft, faIdCard, faVideo } from '@fortawesome/free-solid-svg-icons'



import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';

const Announcement = React.lazy(() => import('../../components/Announcement/Announcement'));
const Inventory = React.lazy(() => import('../..//components/Inventory/Inventory'));
const LeaderBoard = React.lazy(() => import('../../components/LeaderBoard'));

library.add(faSatelliteDish, faTable, faSignOutAlt, faAngleLeft, faIdCard, faVideo)

export default class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.handleLogout = this.handleLogout.bind(this);
		this.toggleLeaderBoard = this.toggleLeaderBoard.bind(this);
		this.toggleContact = this.toggleContact.bind(this);
		this.toggleAnnouncements = this.toggleAnnouncements.bind(this);
		this.toggleInventory = this.toggleInventory.bind(this);

		this.state = {
			isLoggedIn: true,
			LeaderBoardModal: false,
			ContactModal: false,
			AnnouncementsOpen: false,
			InventoryCollapse: false,
		}
	}

	toggleLeaderBoard() {
		this.setState(prevState => ({
			LeaderBoardModal: !prevState.LeaderBoardModal
		}))
	}
	toggleContact() {
		this.setState(prevState => ({
			ContactModal: !prevState.ContactModal
		}))
	}
	toggleInventory() {
		this.setState(prevState => ({
			InventoryCollapse: !prevState.InventoryCollapse
		}))
	}

	toggleAnnouncements(event) {
		this.setState({
			AnnouncementsOpen: !this.state.AnnouncementsOpen,
		})

	}
	handleLogout() {
		localStorage.removeItem('token');
		this.setState({ isLoggedIn: false });
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

	render() {
		if (this.state.isLoggedIn === false) {
			return (<Redirect to="/" />)
		} else {
			return (
				<React.Fragment>
					<Row className="d-flex justify-content-between">
						<Col xs="1" className="h-100 d-flex flex-column">
							<Nav pills className="d-flex flex-column justify-content-start">
								<NavItem>
									<NavLink
										className={classnames({ active: this.state.activeTab === 'Announcements' })}
										id="Announcements"
									>
										<FontAwesomeIcon icon={faSatelliteDish} size="3x" />
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: this.state.activeTab === 'LeaderBoard' })}
										onClick={this.toggleLeaderBoard}
									>
										<FontAwesomeIcon icon={faTable} size="3x" />
										<Modal centered="true" isOpen={this.state.LeaderBoardModal} toggle={this.toggleLeaderBoard} className="modal-lg">
											<ModalHeader>LeaderBoard</ModalHeader>
											<ModalBody className="container-fluid mw-100">
												<Row>
													<Col>
														<LeaderBoard />
													</Col>
												</Row>
											</ModalBody>
											<ModalFooter>
												<Button color="danger text-white" onClick={this.toggleLeaderBoard}>Cancel</Button>
											</ModalFooter>
										</Modal>
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: this.state.activeTab === 'LeaderBoard' })}
										onClick={this.toggleLeaderBoard}
									>
										<FontAwesomeIcon icon={faVideo} size="3x" />
										<Modal centered="true" isOpen={this.state.LeaderBoardModal} toggle={this.toggleLeaderBoard} className="modal-lg">
											<ModalHeader>LeaderBoard</ModalHeader>
											<ModalBody className="container-fluid mw-100">
												<Row>
													<Col>
														<LeaderBoard />
													</Col>
												</Row>
											</ModalBody>
											<ModalFooter>
												<Button color="danger text-white" onClick={this.toggleLeaderBoard}>Cancel</Button>
											</ModalFooter>
										</Modal>
									</NavLink>
								</NavItem>
							</Nav>
							<Nav pills className="d-flex flex-column justify-content-end mt-auto">
								<NavItem className="d-flex">
									<NavLink className={classnames({ active: this.state.activeTab === 'Exit' })}
										id="Exit" onClick={this.toggleContact}>
										<FontAwesomeIcon icon={faIdCard} size="3x" />
										<Modal centered="true" isOpen={this.state.ContactModal} toggle={this.toggleContact} className="modal-lg">
											<ModalHeader>Contact</ModalHeader>
											<ModalBody>
												<div class="p-2 mx-auto">
													Co-ordinator : Surya Prasath S<br />
													Email : hackin2019@gmail.com<br />
													Phone : 9791745977<br />
												</div>

											</ModalBody>
											<ModalFooter>
												<Button color="danger text-white" onClick={this.toggleContact}>Close</Button>
											</ModalFooter>
										</Modal>
									</NavLink>
								</NavItem>
								<NavItem className="d-flex ">
									<NavLink className={classnames({ active: this.state.activeTab === 'Exit' })}
										id="Exit" onClick={this.handleLogout}>
										<FontAwesomeIcon icon={faSignOutAlt} size="3x" />
									</NavLink>
								</NavItem>
							</Nav>
							<Popover name="1" placement="left-start" trigger="click" isOpen={this.state.AnnouncementsOpen} target="Announcements" toggle={this.toggleAnnouncements.bind(this)}>
								<PopoverHeader>Announcements</PopoverHeader>
								<PopoverBody><Announcement /></PopoverBody>
							</Popover>
						</Col>
						<Col xs="auto">

						</Col>
						<Col xs="1" className="d-flex flex-column justify-content-center align-items-center">
							<Nav pills>
								<NavItem >
									<NavLink className={classnames({ active: this.state.activeTab === 'Inventory' })} onClick={this.toggleInventory}>
										<FontAwesomeIcon icon={faAngleLeft} size="3x" />
									</NavLink>
								</NavItem>
							</Nav>
							<Collapse isOpen={this.state.InventoryCollapse} className="navbar-collapse">
								<Col xs="auto" className="h-100 w-50 d-flex">
									<Inventory />
								</Col>
							</Collapse>
						</Col>

					</Row>
				</React.Fragment >
			)
		}
	}
}