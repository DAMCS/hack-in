import React, { Component } from 'react';
import NumpadLock from 'assets/images/level1/numpad_reveal.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

var screenstyle = {
	position: 'absolute',
	width: '245px',
	height: '90px',
	background: 'transparent',
	border: '0px',
	color: '#222',
	padding: '10px',
	textAlign: 'right',
	top: '40px',
	left: '130px',
	borderRadius: '25px'
}

export default class NumpadReveal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			keyinput: '',
			lvlCleared: false
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		const value = event.target.alt;
		switch (value) {
			case 'enter': {
				if (this.state.keyinput !== '') {
					this.setState({ keyinput: '' });
				}
				axios({
					method: "post",
					url: "/api/level/completion",
					headers: {
						Authorization: "Bearer " + localStorage.getItem('token')
					},
					data: {
						levelId: 1,
						password: this.state.keyinput
					}
				}).then(response => {
					if (response.data.status === "Success") {
						toast.success(response.data.message);
						this.setState({
							lvlCleared: true
						})
					}
				})
					.catch(error => {
						console.log(error);
						toast.error(error.response.data.message);
						if (error.response.data.message === "Auth failed. Please Login.") {
							this.props.history.push("/");
						}
					});
				break;
			}
			case 'Clear': {
				this.setState({ keyinput: '' });
				break;
			}
			case 'Delete': {
				var str = this.state.keyinput;
				str = str.substr(0, str.length - 1);
				this.setState({
					keyinput: str
				});
				break;
			}

			default: {
				if (this.state.keyinput.length < 4) {
					this.setState({
						keyinput: this.state.keyinput + value
					})
				}
				break;
			}
		}
	}

	render() {
		if (this.state.lvlCleared) {
			return <Redirect to = {{ pathname: "/" }} />;
		}
		return (
			<div className='levelOne'>
				<div className="screen-row">
					<input type="text" style={screenstyle} value={this.state.keyinput} max="9999" readOnly />
				</div>
				<img src={NumpadLock} alt='Room One' useMap='#numpad-map' />
				<map name="numpad-map">
					<area alt="0" title="0" coords="30,379,97,439" shape="rect" onClick={this.handleClick} />
					<area alt="1" title="1" coords="30,300,96,357" shape="rect" onClick={this.handleClick} />
					<area alt="2" title="2" coords="117,299,180,359" shape="rect" onClick={this.handleClick} />
					<area alt="3" title="3" coords="201,300,268,358" shape="rect" onClick={this.handleClick} />
					<area alt="4" title="4" coords="32,217,97,277" shape="rect" onClick={this.handleClick} />
					<area alt="5" title="5" coords="117,218,180,277" shape="rect" onClick={this.handleClick} />
					<area alt="6" title="6" coords="200,217,270,278" shape="rect" onClick={this.handleClick} />
					<area alt="7" title="7" coords="31,137,97,195" shape="rect" onClick={this.handleClick} />
					<area alt="8" title="8" coords="117,137,181,197" shape="rect" onClick={this.handleClick} />
					<area alt="9" title="9" coords="202,136,267,196" shape="rect" onClick={this.handleClick} />
					<area alt="enter" title="enter" coords="117,378,269,440" shape="rect" onClick={this.handleClick} />
				</map>
			</div>
		)
	}
}