/* In this file we initialise a new game
And check any properties related to the game state*/ 


const websocket = require("ws") ; 

/**
 * Game constructor. Every game will have two players identified by their WebSocket.
 * @param {number} gameID unique identifier for each game  
 */

const Game = function (gameID) {
    this.playerA = null;
    this.playerB = null; 
    this.id = gameID ; 
    this.gameState = "0" ; // TO DO : care with gamestates 
}



