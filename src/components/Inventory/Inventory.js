import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

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

	document.addEventListener('drop', function (e) {

		if (e.target.getAttribute('data-draggable') === 'target') {
			e.target.appendChild(item);

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
		};
	}
	render() {
		return (
			<React.Fragment >
				<ListGroup data-draggable="target">
					<ListGroupItem data-draggable="target">
						<img width="50px" alt="" height="50px" src={require('./hacker1.png')} />
					</ListGroupItem>
					<ListGroupItem data-draggable="target">
						<img width="50px" alt="" height="50px" src={require('./hacker1.png')} />
					</ListGroupItem>
					<ListGroupItem data-draggable="target">
						<img width="50px" alt="" height="50px" src={require('./hacker1.png')} />
					</ListGroupItem>
				</ListGroup>
				<ListGroup data-draggable="target">
					<ListGroupItem data-draggable="target">

					</ListGroupItem>
				</ListGroup>
			</React.Fragment>
		);
	}
}