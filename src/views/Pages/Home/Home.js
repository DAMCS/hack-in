import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col,Container } from 'reactstrap';
import classnames from 'classnames';
import axios from "axios";

const Header = React.lazy(() => import("./Header"));
const Footer = React.lazy(() => import("./Footer"));
const Login = React.lazy(() => import("./SignIn"));
const SignUp = React.lazy(() => import("./SignUp"));


class ControlledTabs extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			activeTab: '1'
		};
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}
	render() {
		return (
			<div>
				
				<Nav tabs>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '1' })}
							onClick={() => { this.toggle('1'); }}
						>
							Login
            		</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '2' })}
							onClick={() => { this.toggle('2'); }}
						>
							SignUp
            	</NavLink>
					</NavItem>
				</Nav>
				<br />
				<TabContent activeTab={this.state.activeTab}>
					<TabPane tabId="1">
								<Login />
					</TabPane>
					<TabPane tabId="2">
								<SignUp />
					</TabPane>
				</TabContent>
			</div>
		);
	}
}
export default class Home extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);

		this.state = {
			isLoggedIn: false,
			activeTab: "SignIn"
		};
	}
	toggle() {
		if (this.state.activeTab === "SignIn") {
			this.setState({
				activeTab: "SignUp"
			})
		}
		else if (this.state.activeTab === "SignUp") {
			this.setState({
				activeTab: "SignIn"
			})
		}
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
					this.setState({ isLoggedIn: true });
				}
			});
		}
	}

	render() {
		if (this.state.isLoggedIn === true) {
			return <Redirect to="/dashboard" />;
		} else {
			return (
				<React.Fragment>
					<div class="d-flex align-items-center">
						<Container fluid className="w-100">
							<Row>
								<Col xs="12">
									<Header />
								</Col>
							</Row>
							<Row className="">
								<Col xs="12" className="d-flex flex-column justify-content-center align-items-center align-middle w-50">
									<TabContent activeTab={this.state.activeTab} className="p-2">
										<TabPane tabId="SignIn">
											<Login />
										</TabPane>
										<TabPane tabId="SignUp">
											<SignUp onSignUpToggle={this.toggle} />
										</TabPane>
									</TabContent>
									<NavLink href="#" name={this.state.activeTab} onClick={this.toggle} className={this.state.activeTab === "SignUp" ? "d-none" : "d-block"}>
										{this.state.activeTab === "SignIn" ? "Don't have an account yet?" : ""}
									</NavLink>
								</Col>
							</Row>
							{/* <Row>
								<Footer />
							</Col>
						</Row>
					</Container>
				</React.Fragment >
			);
		}
	}
}