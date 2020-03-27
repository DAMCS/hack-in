import React, { Component } from 'react';

export default class DataFlow extends Component {

	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

	componentDidMount() {

		var c = this.myRef.current;
		var ctx = c.getContext("2d");

		//making the canvas full screen
		c.height = 50;
		c.width = 600;
		//binary characters - taken from the unicode charset
		var binary = "10";
		//converting the string into an array of single characters
		binary = binary.split("");

		var font_size = 10;
		var columns = c.width / font_size; //number of columns for the rain
		//an array of drops - one per column
		var drops = [];
		//x below is the x coordinate
		//1 = y co-ordinate of the drop(same for every drop initially)
		for (var x = 0; x < columns; x++)
			drops[x] = 1;

		//drawing the characters

		function draw() {
			//Black BG for the canvas
			//translucent BG to show trail
			ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
			ctx.fillRect(0, 0, c.width, c.height);

			ctx.fillStyle = "#0F0"; //green text
			ctx.font = font_size + "px arial";
			//looping over drops
			for (var i = 0; i < drops.length; i++) {
				//a random binary character to print
				var text = binary[Math.floor(Math.random() * binary.length)];
				//x = i*font_size, y = value of drops[i]*font_size
				ctx.fillText(text, drops[i] * font_size, i * font_size);

				//sending the drop back to the top randomly after it has crossed the screen
				//adding a randomness to the reset to make the drops scattered on the Y axis
				if (drops[i] * font_size > c.height && Math.random() > 0.975)
					drops[i] = 0;

				//incrementing Y coordinate
				drops[i]++;
			}
		}

		setInterval(draw, 1);
	}

	render() {
		return (
			<React.Fragment>
				<canvas id="c" ref={this.myRef} ></canvas>
			</React.Fragment>
		)
	}
}


