

const express = require("express");
const http = require("http");

const indexRouter = require("./routes/index");

const Game = require("./game");
const game = require("../../JavaScript/balloons-game/game");
const gameStats = require("./statstracker");

if(process.argv.length < 3) {
  console.log("Error: expected a port as argument (eg. 'node app.js 3000').");
  process.exit(1);
}

const port = process.argv[2];
const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/play", indexRouter) ; 
app.get("/", indexRouter) ; 


const server = http.createServer(app); 
const wss = new WebSocket.server({ server }); /// Websocket server

const websockets = {}; // List of websockets

let connectionID = 0 ;
let currentGame = new Game (); 

wss.on("connection", function connection(ws) { 

  /**
   * 
   */
  const con = ws; // Connection !
  con["id"] = connectionID++;  
  websockets[[con.id]] = currentGame; // We add each game in the websockets list
  
  /**
   * Player connected
   */
  console.log(
    `Player ${con["id"]} placed in game ${currentGame.id} as ${playerType}`
  );    

  if (currentGame.hasTwoPlayers()) { // Create new game object after starting game
    currentGame = new Game(gameStats.gamesInitialized++); // TO DO : WHY ?
  }

  let firstCard ; 
  let secondCard ; 

  con.on("message", function incoming(message) {
    const msg = JSON.parse(message.toString()); 
    const gameObj = websockets[con["id"]]; 
    const currentPlayer = gameObj.playerA ; // Player defined by the connection 
    gameObj.playerB.send(msgString("opponent-choice", message.card)); // After a valid move we send out the card to the enemy player
    if (msg.requestNr == 1) // 1st choice
      firstCard = msg.card ;
    else {
      if (firstCard.id == secondCard.id) { // Validation
        
        gameObj.playerAScore++; 
        gameObj.playerB.send(msgString("opponent-scores")); 
        gameObj.playerA.send(msgString("you-scored")); 

        if (gameObj.playerAScore + gameObj.playerBScore == gameObj.cardsNumber) {
          gameObj.playerB.send(msgString("opponent-won"));
          gameObj.playerA.send(msgString("you-won")); 
          gameStats.gamesCompleted++;
          return; // Terminate game 
        }
        else {
          let aux = gameObj.playerA;  // Switch players and scores so now the other player is moving
          gameObj.playerA = gameObj.playerB; 
          gameObj.playerB = aux ; 
          let aux2 = gameObj.playerAScore ; 
          gameObj.playerAScore = gameObj.playerBScore; 
          gameObj.playerBScore = aux2;  
        }
      }
      else {
        gameObj.playerA.send("wrong-guess");
        gameObj.playerB.send("wrong-guess");    
      } 
    }
    gameObj.playerA.send(msgString("your-turn")); 
  });


  con.on("close", function(code) {
    console.log(`${con["id"]} disconnected ...`); 

    if (code == 1001) {
      /**
       * abort game if not already completed
       */

      const gameObj = websockets[con["id"]]; 

      try {
        gameObj.playerA.close(); 
        gameObj.playerA = null; 
      } catch (e) {
        console.log ("Player A closing: " + e); 
      }

      try {
        gameObj.playerB.close(); 
        gameObj.playerB = null; 
      } catch (e) {
        console.log("Player B closing: " + e ) ;
      }
    }
  });
});
