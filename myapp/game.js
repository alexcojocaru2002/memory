/* In this file we initialise a new game
And check any properties related to the game state*/ 


const websocket = require("ws") ; 

/**
 * Game constructor. Every game will have two players identified by their WebSocket.
 * @param {number} gameID unique identifier for each game  
 */



const Card = function (id) {
    this.id = id;
    this.image = `image${id}.png`; 
    this.position = 0; 
}

const Game = function (gameID) {
    this.playerA = null;    // PlayerA will always move
    this.playerB = null;    // PlayerB will wait for opponent's move
    this.playerAScore = 0; 
    this.playerBScore = 0; 
    this.id = gameID ; 
    this.gameState = "0" ; // TO DO : care with gamestates 
    this.cardsNumber = 14;  
    this.cards = this.createCards();


    this.addPlayer = function(p) {
        if (this.playerA != null && this.playerB != null)
            return new Error (`Invalid call to addPlayer, game is full`); 

        if (this.playerA == null) 
            this.playerA = p;
        else 
            this.playerB = p; 
    }
    
    this.hasTwoPlayers = function () {
        return (this.playerA != null && this.playerB != null); 
    }
    
    this.createCards () = function() { // Creates cards and randomises their order
        let cardsArray = new Array(this.cardsNumber) ;
        for (i = 1 ; i < this.cardsNumber; i++) {
            this.cards.push(new Card(i));  
            this.cards.push(new Card(i));
        }
        let cardsArray2 = cardsArray
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        return cardsArray2; 
    }
}

module.exports = game; 

