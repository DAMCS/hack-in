import React, { Component } from 'react';
import {Row, Col} from 'reactstrap';
import DataFlow from './DataFlow.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faServer,faDesktop} from '@fortawesome/free-solid-svg-icons'

export default class LevelOne extends Component {
	render() {
		return (
			<React.Fragment >

                <Row>
					<Col md="4"><FontAwesomeIcon icon={faDesktop} size="7x" /></Col>
					<Col md="4"><DataFlow /></Col>
					<Col md="4"><FontAwesomeIcon icon={faServer} size="7x" /></Col>
				</Row>
			</React.Fragment>
		)
	}
}