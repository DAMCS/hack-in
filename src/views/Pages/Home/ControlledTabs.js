import React from "react";
import { Container } from "react-bootstrap";
const Login = React.lazy(() => import("./Login"));
const Signup = React.lazy(() => import("./Signup"));

class ControlledTabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			class1: "active",
			class2: "",
			bool1: "true",
			bool2: "",
			active1: "tab-pane fade active in",
			active2: "tab-pane fade"

		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		if (
			this.state.class1 === "active" &&
			this.state.bool1 === "true" &&
			this.state.active1 === "tab-pane fade active in"
		) {
			this.setState({
				class1: "",
				bool1: "false",
				class2: "active",
				bool2: "true",
				active1: "tab-pane fade",
				active2: "tab-pane fade active in"
			});
		} else if (
			this.state.class2 === "active" &&
			this.state.bool2 === "true" &&
			this.state.active2 === "tab-pane fade active in"
		) {
			this.setState({
				class2: "",
				bool2: "false",
				class1: "active",
				bool1: "true",
				active2: "tab-pane fade",
				active1: "tab-pane fade active in"
			});
		}
	}
	render() {
		return (
			<Container fluid className="center-block">
				<ul class="nav nav-tabs">
					<li onClick={this.handleChange} class={this.state.class1}>
						<a aria-expanded={this.state.bool1} data-toggle="tab">
							Login
						</a>
					</li>
					<li onClick={this.handleChange} class={this.state.class2}>
						<a aria-expanded={this.state.bool2} data-toggle="tab">
							Signup
						</a>
					</li>
				</ul>
				<br />
				<div id="myTabContent" class="tab-content">
					<div class={this.state.active1} id="home">
						<Login />
					</div>
					<div class={this.state.active2} id="profile">
						<Signup />
					</div>
				</div>
			</Container>

		);
	}
}

export default ControlledTabs;