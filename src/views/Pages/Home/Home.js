import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { TabContent, TabPane, NavLink, Row, Col, Container } from 'reactstrap';
import axios from "axios";
import ReactGA from 'react-ga';
const Header = React.lazy(() => import("./Header"));
const Login = React.lazy(() => import("./SignIn"));
const SignUp = React.lazy(() => import("./SignUp"));
const Footer = React.lazy(()=>import("./Footer"));

function initializeReactGA() {
	ReactGA.initialize('UA-104887157-5');
	ReactGA.pageview('/homepage');
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

		initializeReactGA();
		if (this.state.isLoggedIn === true) {
			return <Redirect to="/dashboard" />;
		} else {
			return (
				<React.Fragment>
					<Container fluid className="h-100 w-100 d-flex flex-column justify-content-center">
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
						<Row>
							<Col xs="12">
								<Footer />
							</Col>
						</Row>
					</Container>
				</React.Fragment >
			);
		}
	}
}