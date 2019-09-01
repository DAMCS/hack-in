import React, { Component } from 'react';
import axios from 'axios'

class Announcement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			announcement: [],
			seen: 0
		}
	}
	componentDidMount() {
		var token = localStorage.getItem('token');
		axios.get('/api/announcement', {
			headers: {
				"Authorization": "Bearer " + token
			}
		})
		.then((res) => {
			this.setState({ 
				announcement: res.data.data.announcements,
				seen: res.data.data.seen
			});
		})
		.catch(function (error) {
			console.log(error);
		})
	}

	render() {
		return (
			<div>
				{
				this.state.announcement.map((object, i) => {
					return <div><font color={this.state.seen < object.annoId ? "red" : ""}>{object.annoMsg}</font> <br /></div>
				})}
			</div>
		);
	}
}

export default Announcement;