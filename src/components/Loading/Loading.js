import React, { Component } from 'react';
const Page404 = React.lazy(() => import('views/Pages/Page404'));

export default class Loading extends Component {
	constructor(props) {
		super(props);
		this.state = {
			render: false
		}
	}

	componentDidMount() {
		setTimeout(function () { //Start the timer
			this.setState({ render: true }) //After 1 second, set render to true
		}.bind(this), 1000)
	}

	render() {
		let renderContainer = (<div className="h-100 w-100 d-flex justify-content-center align-items-center">Loading...</div>); //By default don't render anything
		if (this.state.render) { //If this.state.render == true, which is set to true by the timer.
			renderContainer = <Page404 /> //Add dom elements
		}
		return (
			renderContainer //Render the dom elements, or, when this.state == false, nothing.
		)
	}
}
