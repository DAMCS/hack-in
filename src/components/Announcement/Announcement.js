import React, { Component } from 'react';
import axios from 'axios'

class Announcement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			announcement: []
		}
	}
	componentDidMount() {
		var token = localStorage.getItem('token');
		axios.get('/api/announcement',
			{
				headers: {
					"Authorization": "Bearer " + token
				}
			}
		).then((res) => {
			this.setState({ 
				announcement: res.data.data
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
					return <div><font color={object.seen === false ? "red" : ""}>{object.annoMsg}</font> <br /></div>
				})}
			</div>
		);
	}
}

export default Announcement;