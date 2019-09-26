import React, { Component } from 'react';
import { Row, Col, Button, Input ,NavLink } from 'reactstrap';
import ReactGA from 'react-ga';
import RoomNine from 'assets/images/level9/levelnine.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';
import "./_level_nine.css"
import { toast } from 'react-toastify';
import axios from 'axios';

function initializeReactGA() {
	ReactGA.initialize(process.env.REACT_APP_GA_ID);
	ReactGA.pageview('/levelnine');
}

$.fn.landPiece = function( options ) {
 
    // This is the easiest way to have default options.
    var settings = $.extend({
        action: "getSurroundingNotAvailable",
    }, options );
    
    var column = parseInt(this.first().attr('column'));
    var row = parseInt(this.first().attr('row'));
    var returnLand = [this];
    
    switch (options.action) {
        case "getSurroundingNotAvailable":
        
            var columnOffset = (row % 2 == 0) ? -1 : 0;
            var cssHex = 'div.hex';
            var notAvailable = '[available="false"]';
            var notUsed = '.notused';
            var topRow = '[row="' + (row - 1) + '"]';
            var middleRow = '[row="' + (row) + '"]';
            var bottomRow = '[row="' + (row + 1) + '"]';
            var middleLeft = '[column="' + (column - 1) + '"]';
            var middleRight = '[column="' + (column + 1) + '"]';
            var otherLeft = '[column="' + (column + columnOffset) + '"]';
            var otherRight = '[column="' + (column + columnOffset + 1) + '"]';
            
            var landTopLeft = $(cssHex + topRow + otherLeft + notAvailable).
                not(notUsed);
            var landTopRight = $(cssHex + topRow + otherRight + notAvailable).
                not(notUsed);
            var landLeft = $(cssHex + middleRow + middleLeft + notAvailable).
                not(notUsed);
            var landRight = $(cssHex + middleRow + middleRight + notAvailable).
                not(notUsed);
            var landBottomLeft = $(cssHex + bottomRow + otherLeft + notAvailable).
                not(notUsed);
            var landBottomRight = $(cssHex + bottomRow + otherRight + notAvailable).
                not(notUsed);
            returnLand = [
                landTopRight,
                landRight,
                landBottomRight,
                landBottomLeft,
                landLeft,
                landTopLeft
            ];

            break;
    }
    
    return $(returnLand).map (function () {return this.toArray(); } );
    
};

Array.prototype.next = function() {
    if (this.current >= (this.length - 1)) {
        this.current = 0;
    } else {
        ++this.current;
    }
    return this[this.current];
};
Array.prototype.current = 0;

//Setup selectable option values
var GAMES = {};
GAMES.Proximity = {};
GAMES.Proximity.Options = {};
GAMES.Proximity.Options.landMass = ['all'];
GAMES.Proximity.Options.neighborTerritories = ['strengthen'];
GAMES.Proximity.Options.enemyTerritories = ['no change'];
GAMES.Proximity.Options.victoryCondition = ['most soldiers'];

//Setup constants...
GAMES.Proximity.Constants = {};
GAMES.Proximity.Constants.highestValue = 20;
GAMES.Proximity.Constants.teamColors = ["red", "blue"];
GAMES.Proximity.Constants.cssHexColors = "notconquered red blue";

GAMES.Proximity.rollDice = function() {
    return Math.floor(
        Math.random() *
        GAMES.Proximity.Constants.highestValue
    ) + 1;
};

GAMES.Proximity.rollRedDice = function(value) {
    var randDiceRoll = value;
    $('#redDiceRoll').text(randDiceRoll);
    $('#redDiceRoll').data('roll', randDiceRoll);
};

GAMES.Proximity.updateScores = function() {

    var $redLand = $('#gameBoard div.hex.red');
    var redSoldiers = 0;
    var $blueLand = $('#gameBoard div.hex.blue');
    var blueSoldiers = 0;

    // Update red scores    
    $('#red-land').text($redLand.length);
    $redLand.each(function() {
        redSoldiers += $(this).data('soldiers');
    });
    $('#red-soldiers').text(redSoldiers);


    // Update blue scores    
    $('#blue-land').text($blueLand.length);
    $blueLand.each(function() {
        blueSoldiers += $(this).data('soldiers');
    });
    $('#blue-soldiers').text(blueSoldiers);

};

GAMES.Proximity.drawBoard = function() {
    var $gameBoard = $('#gameBoard');
    $gameBoard.empty();
    var hexRowCss = [
            'hex-row',
            'hex-row even'
        ]
        //draw the container rows...
    for (var row = 1; row <= 10; row++) {
        var $newRow = $('<div></div>').
        addClass(hexRowCss[row % 2]).
        attr('row', row.toString());
        $gameBoard.append($newRow);
        //draw the individual land pieces for the row.
        for (var column = 1; column <= 12; column++) {
            var $newLand = $('<div></div>').
            addClass('hex').
            attr('row', row.toString()).
            attr('column', column.toString());
            $gameBoard.
            find('div.hex-row[row=' + row.toString() + ']').
            append($newLand);
        }
    }
}

GAMES.Proximity.setupGame = function(options) {

    if (options.configFromHTML) {
        $('.config-options').each(function() {
            var $this = $(this);
            options[$this.attr('config')] = $this.text();
        });
    }

    GAMES.Proximity.drawBoard();
    //reset scores.
    $('#blue-soldiers').data('count', 0);
    $('#blue-land').data('count', 0);
    $('#red-soldiers').data('count', 0);
    $('#red-land').data('count', 0);

    var landMass = {};
    landMass['all'] = 1;
    landMass['most'] = 8;
    landMass['some'] = 16;

    //reset each hexagon land piece.
    $('#gameBoard .hex').each(function() {
        var $this = $(this);
        $this.
        removeClass(GAMES.Proximity.Constants.cssHexColors).
        data("soldiers", 0).
        text("");

        var randNumber = GAMES.Proximity.rollDice();

        //randomize available spaces on the board.
        if (randNumber >= landMass[options.landMass]) {
            $this.attr('available', "true");
            $this.addClass('notconquered');
        } else {
            $this.addClass('notgamespace');
            $this.attr('available', "false");
        }
    });

    GAMES.Proximity.rollRedDice();
    GAMES.Proximity.updateScores();
};

GAMES.Proximity.conquerSpace = function($space, team, armySize) {
    $space.removeClass(GAMES.Proximity.Constants.cssHexColors).
    addClass(team).
    text(armySize).
    data("soldiers", armySize).
    attr("available", "false");
    console.log($space);
    var $nearbyLand = $space.landPiece({
        action: 'getSurroundingNotAvailable'
    });
    var otherTeam = (GAMES.Proximity.Constants.teamColors[0] === team) ?
        GAMES.Proximity.Constants.teamColors[1] : GAMES.Proximity.Constants.teamColors[0];
    var neighborTerritories = $('.config-options[config="neighborTerritories"]').text();
    var enemyTerritories = $('.config-options[config="enemyTerritories"]').text();

    //loop through each neighboring space.
    $nearbyLand.each(function() {
        let $this = $(this);
        //if neighboring take over settings have changed, and this space is the current teams...
        if ($this.hasClass(team) && neighborTerritories !== "no change") {
            //if weaken, -1. else +1.
            var unitChange = (neighborTerritories === "weaken") ? -1 : 1;
            var newCount = $this.data("soldiers") + unitChange;
            $this.
            text(newCount).
            data("soldiers", newCount);
        }

        if ($this.data("soldiers") &&
            $this.data("soldiers") < $space.data("soldiers")) {
            //if enemy take over settings have changed, and this space is the other teams space...
            if ($this.hasClass(otherTeam) && enemyTerritories !== "no change") {
                //if weaken, -1. else +1.
                var unitChange = (enemyTerritories === "weaken") ? -1 : 1;
                var newCount = $this.data("soldiers") + unitChange;
                $this.
                text(newCount).
                data("soldiers", newCount);
            }

            $this.
            removeClass(GAMES.Proximity.Constants.cssHexColors).
            addClass(team);
        }
    });

};

GAMES.Proximity.registerLandClicks = function(player, flipCol, coord, value, inc) {
    var insRow = coord[0];
    var insCol = coord[1];

    insRow = (insRow + 1).toString();
    insCol = (insCol + 1).toString();

    var $availableLand = $('.hex[available=true][row=' + insRow + '][column=' + insCol + ']');

    var randDiceRoll = value;

    var $newBlue = $($availableLand);
    if (player == "me") {
        // console.log($newBlue)
        GAMES.Proximity.conquerSpace($newBlue, 'red', randDiceRoll);
        $('#redDiceRoll').text(value);
        $('#redDiceRoll').data('roll', value);
    } else {
        GAMES.Proximity.conquerSpace($newBlue, 'blue', randDiceRoll);
        $('#blueDiceRoll').text(value);
        $('#blueDiceRoll').data('roll', value);
    }

    var $newBlue = $($availableLand);

    GAMES.Proximity.updateScores();

    //end game...?
    if ($availableLand.length <= 1) {
        //not end game...
    } else {
        GAMES.Proximity.rollRedDice(value);
    }

};

var interval = null;

function displayOutput(input) {
    axios({
        method: "post",
        url: "http://localhost:5000/api/level/final",
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        },
        data: {
            levelId: 9,
            lang: input.lang,
            data: input.data
        }
    }).then(response => {
        var jsonRaw = response.data;
            if (jsonRaw.status === "Error") {
                toast.error("Error : " + jsonRaw.message);
                return;
            }
            if (jsonRaw.message === "You have already completed this level") {
                toast.error(jsonRaw.message);
                return;
            }
            console.log(jsonRaw);
            let json = jsonRaw.gameData;
            var i = 0;
            //var status= json.gameStatus;
            //console.log(json);
    
            interval = setInterval(function() {
                if (i >= json.moves.length) {
                    //stopAnimation();
                    var winner;
                    var victoryCondition = $('.config-options[config="victoryCondition"]').text();
                    var redCount = {};
                    var blueCount = {};
                    redCount.land = parseInt($('#red-land').text());
                    redCount.soldiers = parseInt($('#red-soldiers').text());
                    blueCount.land = parseInt($('#blue-land').text());
                    blueCount.soldiers = parseInt($('#blue-soldiers').text());
    
                    if (victoryCondition == "most land") {
                        if (redCount.land > blueCount.land) {
                            winner = 'Red';
                        } else if (blueCount.land > redCount.land) {
                            winner = 'Blue';
                        } else {
                            winner = 'No one. Tie.';
                        }
                    } else {
                        if (redCount.soldiers > blueCount.soldiers) {
                            toast.error(" You could'nt stop the AI this time!" , {
                                position: "top-center",
                                autoClose: false,
                                hideProgressBar: true,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: false
                                });
                        } else if (blueCount.soldiers > redCount.soldiers) {
                            toast.success(" Well done. You defeated the AI!" , {
                                position: "top-center",
                                autoClose: false,
                                hideProgressBar: true,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: false
                                });
                        } else {
                            toast.warn(" You restricted the AI. But need to defeat it!" , {
                                position: "top-center",
                                autoClose: false,
                                hideProgressBar: true,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: false
                                });
                        }
                    }
                    clearInterval(interval);
                    $("#game-winner").text(winner);
                    
    
                } else {
                    // console.log("json");
                    GAMES.Proximity.registerLandClicks(json.moves[i].player, json.moves[i].flipCol, json.moves[i].coord, json.moves[i].value, json.moves[i].inc);
                    i++;
                }
            }, 1000);
    })
        .catch(error => {
            toast.error("Error : " + error.response.data.message);
            if (error.response.data.message === "Auth failed. Please Login.") {
                this.props.history.push("/");
            }
        });
}

class OutputDisplay extends Component { 
    constructor(props) { 
        super(props);
    }

    componentDidMount() {
        GAMES.Proximity.setupGame({'configFromHTML': true});
    }

    render() {
        return (
            <div id="botwar">
                <div id="gameBoard" />
                <div style={{clear: 'both'}} />
                <div id="red-stats">
                    <span id="text-red-soldiers" className="text-red">Number of <br />AI systems:<br /></span> <span id="red-soldiers" className="text-bold">0</span>
                    <br />
                </div>
                <div className="container-red-dice-roll">
                    <div className="hex-row">
                    <div className="hex red" id="redDiceRoll" />
                    </div>
                </div>
                <div className="container-red-dice-roll">
                    <div className="hex-row">
                    <div className="hex blue" id="blueDiceRoll" />
                    </div>
                </div>
                <div id="blue-stats">
                    <span id="text-blue-soldiers" className="text-blue">No of <br />infected systems:<br /></span> <span id="blue-soldiers" className="text-bold">0</span>
                    <br />
                </div>
                <div className="no-display">
                    <div id="dialog-game-config" title="Game Setup">
                    <h3>Players</h3>
                    <h3>On Takeover</h3>
                    <div><span>Neighboring Territories</span> <span className="config-options" config="neighborTerritories">strengthen</span></div>
                    <div><span>Enemy Territories</span> <span className="config-options" config="enemyTerritories">no change</span></div>
                    <h3>Victory Condition</h3>
                    <div><span>Win due to:</span> <span className="config-options" config="victoryCondition">most soldiers</span></div>
                    <h3>Gameboard</h3>
                    <div><span>Landmass:</span> <span className="config-options" config="landMass">all</span></div>
                    </div>
                    <div id="dialog-game-end" style={{zIndex: 99999999, display: 'block'}} title="Game Over!">
                    <h2>Winner:</h2>
                    <span id="game-winner" />
                    </div>
                    <div id="dialog-game-end1" style={{zIndex: 9999999999, display: 'block'}} title="Game Over!">
                    <h2>Error:</h2>
                    <span id="game-error" />
                    </div>
                </div>
            </div>
        
        );
    }
}


export default class LevelNine extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
            language: 'C++',
            text: `Hahaha... Too late!\nThe evil AI has been released to the internet!\n\nBut you still have one option left...\nThe objective of this mission is to inject computer worms in the internet, and take down the AI. But it is not going to be as easy as it sounds. You can't mannually inject the worms. You have to code a self spreading worm to accomplish this task. Also, you have to fight with the antivirus softwares that try to prevent the possible breakdown of the AI. One catch is, the antivirus softwares have a maximum capacity, just like how your worm spreader script has a capacity.\n\nOnce you have positioned yourself inside the honeycomb structured network, you would be assigned a random capacity between 1 and 20 at each turn. If you place your script adjacent to your own scripts, it will add to their capacity by 1. If you place your script adjacent to any of the antivirus, it can then corrupt them, if your capacity is higher than the adjacent cell's capacity.\n\nCorrupt as many antivirus as possible to beat the AI and clear the mission.`,
            terminal: false,
            output: false,
            data: ""
        }
        this.toggle = this.toggle.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.changeNavigation(9);
    }

    toggle() {
		this.setState(prevState => ({
			terminal: !prevState.terminal
		}));
	}
    handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
        });
    }
    
    handleUpload() {
        var oFReader = new FileReader();
        console.log(document.getElementById("upload"))
        oFReader.readAsDataURL(document.getElementById("upload").files[0]);
        oFReader.onload = oFREvent => {

            var contents = oFREvent.target.result;

            var text = contents.split(',');
            text = text[1];

            // var language = this.state.language;
            console.log(text);
            this.setState({data: text})
            // axios.post('https://hack-a-venture.psglogin.in/botwar.php', {
            //     data: text,
            //     lang: language,
            //     game: "Proximity"
            // }, function (data) {
            //     console.log(data);
            //     Stop_splash();
            //     displayOutput(data);

            // });
        }
    }
    
    render() {
        initializeReactGA();
        if (this.state.terminal === false && this.state.output === false) {
            console.log(interval);clearInterval(interval);
        }
        if (this.state.terminal === false) {
            return (
                <React.Fragment>
                    <div class="d-flex justify-content-center align-items-center">
                        <img src={RoomNine} alt='Room Nine' useMap='#image-door' />
                        <map name="image-door">
                            <area alt="window" title="window" coords="511,427,440,382" shape="rect" onClick={this.toggle} />
                        </map>
                    </div>
                </React.Fragment>
            );
        }else {
            if (this.state.output === false) {
                return (
                    <div class="h-100 w-100 p-4 d-flex flex-column justify-content-center">
                        <Row className="p-4 h-30 w-100 d-flex justify-content-center align-self-center">
                            <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                                <Input style={{ background: 'black', height: '250px' }} type="textarea" name="input" id="input" value={this.state.text} onChange={this.handleChange} disabled />
                            </Col>
                        </Row>
                        <Row className="p-1 h-10 w-100 d-flex justify-content-center align-self-center">
                            <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                                <Button color="success" className="success text-white" onClick={() => { return window.open("/cpp.zip") }}> Download C++</Button>
                            </Col>
                            <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                                <Button color="success" className="success text-white" onClick={() => { return window.open('/java.zip') }}>Download Java</Button>
                            </Col>
                            <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                                <Button color="success" className="success text-white" onClick={() => { return window.open('/python.zip') }}> Download python</Button>
                            </Col>
                        </Row>
                        <Row className="p-4 h-10 w-50 d-flex justify-content-center align-self-center">
                            <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                                <Input type="select" name="language" value={this.state.language} onChange={this.handleChange}>
                                    <option>C++</option>
                                    <option>Java</option>
                                    <option>Python</option>
                                </Input>&nbsp;
                            </Col>
                            <Col className="h-100 w-100 d-flex justify-content-center align-items-center" >
                                <Input type="file" style={{ opacity: "0", position: 'absolute' }} id="upload" name="file-upload" onChange={this.handleUpload} />
                                <p style={{ marginLeft: '10px', marginTop: '15px' }}>
                                    Upload
                                </p>
                            </Col>
                        </Row>
                        <Row className="p-1 h-10 w-100 d-flex justify-content-center">
                            <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                                <Button color="success" className="success text-white" onClick={() => { return window.open('/sample.html') }}> Sample</Button> &nbsp;
                                <Button color="success" className="success text-white" dataToggle="modal" dataTarget="#myModal" id='showOutput' onClick={()=>{this.setState({output:true});displayOutput({lang:this.state.language, data: this.state.data})}} dataBackdrop="static">Output</Button>
                            </Col>
                        </Row>
                        <Row className="p-1 h-10 w-100 d-flex justify-content-center">
                            <Col className="h-50 w-100 d-flex justify-content-center align-items-left">
                                <NavLink className="back-button" onClick={() => { this.setState({ terminal: false }) }}>
                                    <FontAwesomeIcon icon={faChevronCircleLeft} size="1x" title="Back"></FontAwesomeIcon>
                                </NavLink>
                            </Col>
                        </Row>
                    </div>);
                } else {
                    return (
                        <div>
                            <OutputDisplay />
                            <Button className="p-1 h-10 w-100 d-flex justify-content-center" onClick={() => {this.setState({output:false});console.log(interval);clearInterval(interval);}}>Close</Button>
                        </div>
                    );
                }
            }
    }
}