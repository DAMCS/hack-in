import React, { useState } from 'react';
import { Collapse } from 'reactstrap'
import classNames from 'classnames';
import SideBar from './SideBar';
(function () {

	if
		(
		!document.querySelectorAll
		||
		!('draggable' in document.createElement('span'))
		||
		window.opera
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

// export default class Inventory extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			class1: "close",
// 			class2: "open"
// 		};
// 		this.handleChange = this.handleChange.bind(this);
// 	}
// 	handleChange(event) {
// 		if (this.state.class1 === "close" && this.state.class2 === "open")
// 			this.setState({ class1: "open", class2: "close" });
// 		else
// 			this.setState({ class1: "close", class2: "open" });
// 	}
// 	render() {
// 		return (
// 			<React.Fragment >
// 				<div>
// 					<div class={this.state.class1}>
// 						<ol data-draggable="target">
// 							<section id="inventory">
// 								{/* <a href="#" class="closebtn" onClick={this.handleChange}>&times;</a> */}
// 								<NavLink href="#" className="closebtn" onClick={this.handleChange}>&times;</NavLink>
// 								<li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker1.png')} /></li>
// 								<li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker2.png')} /></li>
// 								<li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker4.png')} /></li>
// 								<li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker1.png')} /></li>
// 								<li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker1.png')} /></li>
// 							</section>
// 						</ol>
// 						<ol data-draggable="target" className="list-group">
// 						</ol>
// 					</div>
// 					{/* <a style={{ cursor: "pointer", textDecoration: "none" }} class={this.state.class2} onClick={this.handleChange}>Inventory</a> */}
// 					<a  color="primary" className={this.state.class2} onClick={this.handleChange}><i class="fa fa-briefcase" aria-hidden="true"></i></a>
// 				</div>
// 			</React.Fragment>
// 		);
// 	}
// }


const SubMenu = props => {

	const [collapsed, setCollapsed] = useState(true)
	const toggleNavbar = () => setCollapsed(!collapsed)
	const { icon, title, items } = props;
	return (
		<div>
			<a onClick={toggleNavbar} className={classNames({ 'menu-open': !collapsed })}>
				<i class="fa fa-briefcase" aria-hidden="true"></i>
			</a>
			<Collapse isOpen={!collapsed} navbar className={classNames('items-menu', { 'mb-1': !collapsed })}>
				<SideBar />
			</Collapse>
		</div>
	);
}

export default SubMenu;

