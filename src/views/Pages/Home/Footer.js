import React, { Component } from "react";
import "../../../assets/css/footer.css";
import { Container } from "react-bootstrap";

export default class Footer extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="animated fadeIn">
					<link
						href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
						rel="stylesheet"
					/>
					<section id="lab_social_icon_footer">
						<Container>
							<div class="text-center center-block">
								<a href="https://www.facebook.com/bootsnipp">
									<i
										id="social-fb"
										class="fa fa-facebook-square fa-3x social"
									/>
								</a>
								<a href="https://twitter.com/bootsnipp">
									<i
										id="social-tw"
										class="fa fa-twitter-square fa-3x social"
									/>
								</a>
								<a href="https://plus.google.com/+Bootsnipp-page">
									<i
										id="social-gp"
										class="fa fa-google-plus-square fa-3x social"
									/>
								</a>
								<a href="mailto:#">
									<i
										id="social-em"
										class="fa fa-envelope-square fa-3x social"
									/>
								</a>
							</div>
						</Container>
					</section>
				</div>
			</React.Fragment>
		);
	}
}
