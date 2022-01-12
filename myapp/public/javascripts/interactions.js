
const CARDS_NUMBER = 7 ; 
const fs = require('fs') ; 

function GameState(board, sb, socket) {
    this.player = null; 
    this.cardArray = null ; 
    this.cardsNumber = CARDS_NUMBER ; 
    this.pointsTotal = 0 ; 
    this.socket = socket ; 

    /**
     * Function that generates 2 cards of every type then shuffles the array
     */
    
    this.initializecardArray = function () {
        this.cardArray = new Array(2 * this.cardsNumber) ; 
        for (i = 2 ; i <= this.cardArray.length ; i++ )
            this.cardArray[i] = new Card((int)(i/2)) ;   
        this.cardArray = this.cardArray
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);    
    }
}

function Card (id) {
    this.id = id ; 
    this.element = document.getElementById(`card+${id}`) ; // TO DO : DOUBLE CHECK !    
    this.image = null ; 
}