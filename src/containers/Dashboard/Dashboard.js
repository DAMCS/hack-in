import React, { Component } from 'react';
import { Col, Row, Nav, NavItem, NavLink, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRss, faUsers, faSignOutAlt, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import Announcement from '../../components/Announcement/Announcement'

import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';

// const Menu = React.lazy(() => import('../../components/Menu/Menu'));

const Inventory = React.lazy(() => import('../..//components/Inventory/Inventory'));
const LeaderBoard = React.lazy(() => import('../../components/LeaderBoard'));
const Contact = React.lazy(() => import('../../components/Contact'));

library.add(faRss, faUsers, faSignOutAlt, faAngleLeft)

export default class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.handleLogout = this.handleLogout.bind(this);
		this.toggleLeaderBoard = this.toggleLeaderBoard.bind(this);
		this.toggleAnnouncements = this.toggleAnnouncements.bind(this);

		this.state = {
			isLoggedIn: true,
			LeaderBoardOpen: false,
			AnnouncementsOpen: false,
		}
	}

	toggleLeaderBoard(event) {
		this.setState({
			LeaderBoardOpen: !this.state.LeaderBoardOpen,
		})
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
						<Col xs="1" className="h-100">
							<Nav pills className="h-100 d-flex flex-column justify-content-start">
								<NavItem>
									<NavLink
										className={classnames({ active: this.state.activeTab === 'Announcements' })}
										id="Announcements"
									>
										<FontAwesomeIcon icon={faRss} size="3x" />
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: this.state.activeTab === 'LeaderBoard' })}
										id="LeaderBoard"
									>
										<FontAwesomeIcon icon={faUsers} size="3x" />
									</NavLink>
								</NavItem>
								<NavItem className="d-flex mt-auto">
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
							<Popover name="2" placement="left-start" trigger="click" isOpen={this.state.LeaderBoardOpen} target="LeaderBoard" toggle={this.toggleLeaderBoard.bind(this)}
								className="p-4">
								<PopoverHeader className="mx-auto">LeaderBoard</PopoverHeader>
								<PopoverBody className="mx-auto"><LeaderBoard /></PopoverBody>
							</Popover>
						</Col>
						<Col xs="auto">

						</Col>
						<Col xs="auto">
							<Nav pills className="h-100 d-flex flex-column justify-content-center">
								<NavItem >
									<NavLink className={classnames({ active: this.state.activeTab === 'Exit' })}
										id="Exit" onClick={this.handleLogout}>
										<FontAwesomeIcon icon={faAngleLeft} size="1x" />
									</NavLink>
								</NavItem>
							</Nav>
						</Col>
					</Row>
				</React.Fragment >
			)
		}
	}
}

// {/* <Jumbotron fluid style={{overflowX:"hidden"}}> */ }
// <div class="animated fadeIn" >
// 	<Row>
// 		<Col md="1">
// 			<Anouncement />
// 		</Col>
// 		<Col md="10">
// 		</Col>
// 		<Col md="1">
// 			<Button style={{ background: "black" }} onClick={this.handleLogout}><img width="30px" alt="Signout" height="30px" src={require("../Dashboard/signout.png")} /></Button>
// 			<Inventory />
// 			<LeaderBoard />
// 			<Contact />
// 		</Col>
// 	</Row>
// 	{/* <Row>
//             <Col md="11">
//             </Col>
//             <Col md="1">
//               <Menu />
//             </Col>
//           </Row> */}
// </div>
// {/* </Jumbotron> */ }