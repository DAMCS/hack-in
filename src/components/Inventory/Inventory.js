import React from 'react';

// import './Inventory.css'
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
				<div class="container-fluid d-flex flex-column ">
					<ol data-draggable="target">
						<section id="inventory">
							<li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker1.png')} /></li>
							<li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker1.png')} /></li>
							<li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker1.png')} /></li>
							<li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker1.png')} /></li>
							<li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker1.png')} /></li>
						</section>
					</ol>
					<ol data-draggable="target" className="list-group">
					</ol>
				</div>
			</React.Fragment>
		);
	}
}

