

const express = require("express");
const http = require("http");

const indexRouter = require("./routes/index");

const Game = require("./game");

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
const wss = new WebSocket.server({ server });

const websockets = {}; 

let connectionID = 0 ;
let currentGame = new Game ()
wss.on("connection", function connection(ws) { 

  /**
   * 
   */
  const con = ws; // Connection !
  con.id = connectionID++;  
  websockets[[con.id]] = currentGame; 
});
