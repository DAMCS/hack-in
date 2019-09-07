import React, { Component } from 'react';
import axios from 'axios'

class Announcement extends Component {
	componentDidMount() {
		var token = localStorage.getItem('token');
		axios({
			method:"post",
			url: '/api/announcement/update',
			headers: {
				"Authorization": "Bearer " + token
			},
			data: {
				annoId: this.props.announcement.length
			}
			})
			.then((res) => {
				console.log(res.data)
			})
			.catch(function (error) {
				console.log(error);
			})
	}

	render() {
		return (
			<div>
				{
					this.props.announcement.map((object, i) => {
						return (
							<div>
								<font color={this.props.seen < object.annoId ? "red" : ""}>{(i + 1)+'.'+object.annoMsg}</font> <br />
							</div>)
					})}
			</div>
		);
	}
}

export default Announcement;