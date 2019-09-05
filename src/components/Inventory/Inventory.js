import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const thermal = require('assets/images/inventory/thermal.png');
const usb = require('assets/images/inventory/usb.ico');

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
	render() {
		return (
			<React.Fragment>
				<ListGroup data-draggable="target" className="p-2">
					<ListGroupItem data-draggable="target" className="p-2 inventory">
						<img width="50px" alt="" height="50px" src={thermal} />
					</ListGroupItem>
					<ListGroupItem data-draggable="target" className="p-2 inventory">
						<img width="50px" alt="" height="50px" src={usb} />
					</ListGroupItem>
					<ListGroupItem data-draggable="target" className="p-2 inventory">
						<img width="50px" alt="" height="50px" src={thermal} />
					</ListGroupItem>
				</ListGroup>
			</React.Fragment>
		);
	}
}