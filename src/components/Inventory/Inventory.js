import React from 'react';
import './Inventory.css'
import { Button } from 'reactstrap';
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

export default class Inventory extends React.Component {
  constructor(props){
    super(props);
    this.state={
      class1:"close",
      class2:"open"
    };
    this.handleChange = this.handleChange.bind(this);
  } 
  handleChange(event) {
    if (this.state.class1 === "close" && this.state.class2 === "open")
      this.setState({class1: "open",class2:"close"});
    else
      this.setState({ class1: "close",class2:"open" });
  }
  render(){
    return (
      <React.Fragment >
       <div> 
          <div class={this.state.class1}> 
            <ol data-draggable="target">
              <section id="inventory"> 
                <a href="javascript:void(0)" class="closebtn" onClick={this.handleChange}>&times;</a>
                <li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker1.png')} /></li>
                <li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker2.png')} /></li>
                <li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker4.png')} /></li>
                <li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker1.png')} /></li>
                <li class="item" data-draggable="item" ><img width="50px" alt="" height="50px" src={require('./hacker1.png')} /></li>
              </section>
            </ol>
            <ol data-draggable="target" className="list-group">
            </ol>
        </div>
        <a style={{cursor:"pointer",textDecoration:"none"}}class={this.state.class2} onClick={this.handleChange}>Inventory</a>
        </div>
            
      </React.Fragment>
    );
   }
  }

