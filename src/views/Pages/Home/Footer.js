import React, { Component } from "react";
import "../../../assets/css/footer.css";
import { Container, Row, Col } from "reactstrap";

export default class Footer extends Component {
	render() {
		return (
			<React.Fragment>
				<link
					href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
					rel="stylesheet"
				/>
				<Container fluid>
					<Row>
						<Col>
						<link
							href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
							rel="stylesheet"
						/>

						<section id="lab_social_icon_footer">
							<Container>
								<div style={{ float: "left" }}>
									<h3>PSG College of Technology</h3>
									<h4>Login 2k19</h4>
								</div>
								<div style={{ float: "right" }}>
									<a style={{color:"#2ea155"}} href="https://www.facebook.com/bootsnipp">
										<i
											id="social-fb"
											class="fa fa-facebook-square fa-3x social"
										/>
									</a>
										<a style={{ color: "#2ea155" }} href="https://twitter.com/bootsnipp">
										<i
											id="social-tw"
											class="fa fa-twitter-square fa-3x social"
										/>
									</a>
										<a style={{ color: "#2ea155" }} href="https://plus.google.com/+Bootsnipp-page">
										<i
											id="social-gp"
											class="fa fa-google-plus-square fa-3x social"
										/>
									</a>
										<a style={{ color: "#2ea155" }} href="mailto:#">
										<i
											id="social-em"
											class="fa fa-envelope-square fa-3x social"
										/>
									</a>
								</div>
							</Container>
						</section>
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		);
	}
}
