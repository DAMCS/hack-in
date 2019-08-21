import React, { Component,useState } from 'react';
import {Row,Col,Jumbotron,Tab,Tabs} from "react-bootstrap";

const Login = React.lazy(() => import('./Login'))
const Signup = React.lazy(() => import('./Signup'))
const LeaderBoard = React.lazy(() => import('./LeaderBoard/LeaderBoard'))
const Header = React.lazy(() => import('./Header'))
const Footer = React.lazy(() => import('./Footer'))

function Navs(props){
	if(props.page === "Signin"){
		return <Login />
	}else if(props.page === "Signup"){
		return <Signup />
	}
}

function ControlledTabs() {
	const [key, setKey] = useState('Signin');
	return (
		<Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
			<Tab className="tab-pane fade active in" eventKey="Signin" title="Signin">
				<Navs page={key}></Navs>
			</Tab>
			<Tab  className="tab-pane fade active in" eventKey="Signup" title="Signup">
				{/* <Navs page={key}></Navs> */}
			</Tab>
		</Tabs>
	);
}


export default class Home extends Component {
	render() {
		return (
			<React.Fragment >
				<Jumbotron fluid>
				<Header />
				<Row>
					<Col md="4">
					</Col>
					<Col md="4">
						<ControlledTabs />
					</Col>
					<Col md="4">
					</Col>
				</Row>
				<Footer />
				</Jumbotron>
			</React.Fragment>
		)
	}
}