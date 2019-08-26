import React, { Component } from 'react';

class TableRow extends Component {
	render() {
		return (
			<tr>
				<td>
					{this.props.obj.leader_id}
				</td>
				<td>
					{this.props.obj.leader_name}
				</td>
				<td>
					{this.props.obj.leader_points}
				</td>
			</tr>
		);
	}
}

export default TableRow;