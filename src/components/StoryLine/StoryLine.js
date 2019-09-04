import React from 'react';
import { NavLink } from 'reactstrap';
import Typed from 'typed.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faReply } from '@fortawesome/free-solid-svg-icons'

export default class TypedReactDemo extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			trigger: true,
		}
	}
	toggle(trigger) {
		if (trigger === false) {
			this.state.typed.start();
			this.setState({
				trigger: !trigger
			})
		}
		else if (trigger === true) {
			this.state.typed.stop();
			this.setState({
				trigger: !trigger
			})
		}

	}
	componentDidMount() {
		const strings = [
			'"We live in a world where all wars will <br>begin as cyber wars..<br>It’s the combination of hacking and massive <br>well - coordinated disinformation campaigns.”<br>',
			'Hey! Agent Q, this is Diana from Base.<br>Our Intelligence has received information about<br>Dr.Schwarzenegger, a Russian scientist who <br>explores methods for breaching defenses and <br>exploiting weaknesses in all computer systems.',
			'He is known for creating Digital Intelligence <br>by training data collected through a data breach <br>on all the available social data platforms.<br>',
			'According to the traced information, <br>his digitally intelligent species would be <br>a great threat to humans.',
			'He believes they can outperform us.<br>His violation is completely wrong.<br>',
			'As delegating this big responsibility <br>to the most trusted agent, your mission <br>will not be easy.<br>Our Intelligence has prepared a briefing <br>on the opposition you will face.<br>',
			'Due to the sensitive nature of the assignment,<br>certain rules of engagement must be obeyed.<br>To destroy his work, you have to crack all the <br>security locks enabled in his laboratory.<br>',
			'You can unlock the rooms one by one only.<br>You will be facing various challenges in <br>cracking codes but I will keep you updated with <br>all the necessary details.<br>',
			'So, can your hacking skills help <br>unlock his technical territory ?'
		];
		const options = {
			strings: strings,
			typeSpeed: 30,
		};
		this.typed = new Typed(this.el, options);
		this.setState({
			typed: this.typed,
		})
	}

	componentWillUnmount() {
		this.typed.destroy();
	}

	render() {
		return (
			<div class="h-100 w-100 wrap d-flex flex-column">
				<div class="h-50 w-100 d-flex justify-content-start">
					{this.state.trigger === false ? (<NavLink href="#" onClick={this.toggle.bind(this, false)}><FontAwesomeIcon icon={faPlay} size="2px" /></NavLink>) : (<NavLink href="#" onClick={this.toggle.bind(this, true)}><FontAwesomeIcon icon={faPause} size="2px" /></NavLink>)}
					<NavLink href="#" onClick={() => this.typed.reset()}><FontAwesomeIcon icon={faReply} size="2px" /></NavLink>&nbsp;&nbsp;
						</div>
				<div class="h-50 w-100">
					<span
						style={{ whiteSpace: 'pre' }} class="h-100 w-100"
						ref={(el) => { this.el = el; }}
					/>
				</div>
			</div>
		);
	}
}