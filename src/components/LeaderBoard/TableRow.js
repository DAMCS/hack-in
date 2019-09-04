import React, { Component } from 'react';

class TableRow extends Component {
	render() {
		return (
			<tr>
				<td>
					{
						console.log(this.props.key)
						// this.props.key
					}
				</td>
				<td>
					{this.props.obj.username}
				</td>
				<td>
					{this.props.obj.score}
				</td>
			</tr>
		);
	}
}

export default TableRow;