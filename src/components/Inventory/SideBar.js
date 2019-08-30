import React from 'react';
import { Nav } from 'reactstrap';
import classNames from 'classnames';
import './Inventory.css'

const SideBar = props => (
    <div className={classNames('sidebar', { 'is-open': props.isOpen })}>
        <div className="side-menu">
            <Nav vertical className="list-unstyled pb-3">
                <ol data-draggable="target">
                    <section id="inventory">
                        <li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker1.png')} /></li>
                        <li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker2.png')} /></li>
                        <li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker4.png')} /></li>
                        <li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker1.png')} /></li>
                        <li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker1.png')} /></li>
                    </section>
                </ol>
                <ol data-draggable="target" className="list-group">
                </ol>
            </Nav>
        </div>
    </div>
);


export default SideBar;