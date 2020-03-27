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
    $space.
    removeClass(GAMES.Proximity.Constants.cssHexColors).
    addClass(team).
    text(armySize).
    data("soldiers", armySize).
    attr("available", "false");
    var $nearbyLand = $space.landPiece({
        action: 'getSurroundingNotAvailable'
    });
    var otherTeam = (GAMES.Proximity.Constants.teamColors[0] === team) ?
        GAMES.Proximity.Constants.teamColors[1] : GAMES.Proximity.Constants.teamColors[0];
    var neighborTerritories = $('.config-options[config="neighborTerritories"]').text();
    var enemyTerritories = $('.config-options[config="enemyTerritories"]').text();

    //loop through each neighboring space.
    $nearbyLand.each(function() {
        $this = $(this);
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

$(document).ready(function() {

    $('#dialog-game-end').dialog({
        modal: true,
        closeText: "Play!",
        autoOpen: false,
        close: function() {}
    });

    GAMES.Proximity.setupGame({
        'configFromHTML': true
    });
    //GAMES.Proximity.registerLandClicks();
    displaySample();
});


function displayOutput(input) {
    $.post("https://hack-a-venture.psglogin.in/test2.php", {
        game: 'Proximity',
        lang: 'py',
        data: 'import random\nimport subprocess\n\nclass player:\n    def next_move(self, board, free_space, value):\n        return random.choice(list(free_space))\n    \n'
    }, function(jsonRaw) {
        //console.log(json);
        jsonData = JSON.parse(jsonRaw);
        json = jsonData.medium;
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
                        winner = 'AI';
                    } else if (blueCount.soldiers > redCount.soldiers) {
                        winner = 'You';
                    } else {
                        winner = 'No one. Tie.';
                    }
                }
                clearInterval(interval);
                $("#game-winner").text(winner);
                $('#dialog-game-end').dialog('open');

            } else {
                //console.log(json);
                GAMES.Proximity.registerLandClicks(json.moves[i].player, json.moves[i].flipCol, json.moves[i].coord, json.moves[i].value, json.moves[i].inc);
                i++;
            }
        }, 1000);
    });
}


function displaySample() {
    $.getJSON("https://api.myjson.com/bins/9zwdh", function(json) {
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
                        winner = 'Honeypot server';
                    } else if (blueCount.soldiers > redCount.soldiers) {
                        winner = 'Spam mailer';
                    } else {
                        winner = 'No one. Tie.';
                    }
                }
                clearInterval(interval);
                $("#game-winner").text(winner);
                $('#dialog-game-end').dialog('open');

            } else {
                //console.log(json);
                GAMES.Proximity.registerLandClicks(json.moves[i].player, json.moves[i].flipCol, json.moves[i].coord, json.moves[i].value, json.moves[i].inc);
                i++;
            }
        }, 1500);
    });
}
