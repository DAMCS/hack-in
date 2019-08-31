import React from 'react';
import { NavLink } from 'reactstrap';
import Typed from 'typed.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faReply } from '@fortawesome/free-solid-svg-icons'

export default class TypedReactDemo extends React.Component {
	componentDidMount() {
		const strings = [
			'Some <i>strings</i> are slanted <br/>lsjfhjkdsfh dsfjhsgj',
			'Some <strong>strings</strong> are bold',
			'HTML characters &times; &copy;'
		];
		const options = {
			strings: strings,
			typeSpeed: 50,
			backSpeed: 50
		};
		this.typed = new Typed(this.el, options);
	}

	componentWillUnmount() {
		this.typed.destroy();
	}

	render() {
		return (
			<div className="wrap">
				<div className="type-wrap">
					<span
						style={{ whiteSpace: 'pre' }}
						ref={(el) => { this.el = el; }}
					/>
				</div>
				<a onClick={() => this.typed.start()}><FontAwesomeIcon icon={faPlay} size="2px"/></a>&nbsp;&nbsp;
                <a onClick={() => this.typed.stop()}><FontAwesomeIcon icon={faPause} size="2px" /></a>&nbsp;&nbsp;
                <a href="#" onClick={() => this.typed.reset()}><FontAwesomeIcon icon={faReply} size="2px" /></a>&nbsp;&nbsp;
            </div>
		);
	}
}