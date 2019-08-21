import React, { Component } from 'react';
import { Nav, NavbarBrand, NavItem, Navbar } from 'react-bootstrap';

const Login = React.lazy(() => import('./Login'))
const LeaderBoard = React.lazy(() => import('./LeaderBoard/LeaderBoard'))
const Header = React.lazy(() => import('./Header'))
const Footer = React.lazy(() => import('./Footer'))

export default class Home extends Component {
	render() {
		return (
			<React.Fragment >
				<Header />
				<Login />
				<LeaderBoard />
				<Footer />
			</React.Fragment>
		)
	}
}