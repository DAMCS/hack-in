import React from 'react';
import { ListGroup, ListGroupItem, Tooltip } from 'reactstrap';

const thermal = require('assets/images/inventory/thermal.png');
const usb = require('assets/images/inventory/usb.png');
const torch = require('assets/images/inventory/torch.png');

(function () {
	if (!document.querySelectorAll || !('draggable' in document.createElement('span')) || window.opera
	) { return; }
	for (var
		items = document.querySelectorAll('[data-draggable="item"]'),
		len = items.length,
		i = 0; i < len; i++) {
		items[i].setAttribute('draggable', 'true');
	}
	var item = null;
	document.addEventListener('dragstart', function (e) {
		item = e.target;

		e.dataTransfer.setData('text', '');

	}, false);
	document.addEventListener('dragover', function (e) {
		if (item) {
			e.preventDefault();
		}

	}, false);
	document.addEventListener('dragend', function (e) {
		item = null;

	}, false);

})();

export default class Inventory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tooltipOpenThermal: false,
			tooltipOpenUSB: false,
			tooltipOpenTorch: false
		}

		this.toggleThermal = this.toggleThermal.bind(this);
		this.toggleUSB = this.toggleUSB.bind(this);
		this.toggleTorch = this.toggleTorch.bind(this);
	}


	toggleThermal() {
		this.setState({
			tooltipOpenThermal: !this.state.tooltipOpenThermal
		});
	}

	toggleUSB() {
		this.setState({
			tooltipOpenUSB: !this.state.tooltipOpenUSB
		});
	}

	toggleTorch() {
		this.setState({
			tooltipOpenTorch: !this.state.tooltipOpenTorch
		});
	}

	render() {
		return (
			<React.Fragment>
				<ListGroup data-draggable="target" className="p-2">
					<ListGroupItem data-draggable="target" className="p-2 inventory">
						<img width="50px" alt="" id="thermal" height="50px" src={thermal} />
						<Tooltip placement="left" isOpen={this.state.tooltipOpenThermal} target={'thermal'} toggle={this.toggleThermal}>
							Thermal Imaging Camera
						</Tooltip>
					</ListGroupItem>
					<ListGroupItem data-draggable="target" className="p-2 inventory">
						<img width="50px" alt="" id="usb" height="50px" src={usb} />
						<Tooltip placement="left" isOpen={this.state.tooltipOpenUSB} target={'usb'} toggle={this.toggleUSB}>
							Linux Live USB
						</Tooltip>
					</ListGroupItem>
					<ListGroupItem data-draggable="target" className="p-2 inventory">
						<img width="50px" alt="" id="torch" height="50px" src={torch} />
						<Tooltip placement="left" isOpen={this.state.tooltipOpenTorch} target={'torch'} toggle={this.toggleTorch}>
							Torch
						</Tooltip>
					</ListGroupItem>
				</ListGroup>
			</React.Fragment>
		);
	}
}