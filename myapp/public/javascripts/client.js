
const URL = "ws://localhost:3000"; 

let moves = 0; 
let ws = new WebSocket(URL); 



function onStart() {
  
  console.log(socket); 

  ws.onmessage = function(event) {

    console.log(JSON.parse(event.data)); 
    var msg = JSON.parse(event.data); 

    switch (msg.type) {
      case "your-turn": {
          moves = 2; 
          break; 
      } 
      case "opponent-choice" : {
        card = document.getElementById(`cover${msg.position}`);
        card.style.display = "hidden"; 
      }
      case "correct-choice" : {
        card = document.getElementById(`cover${msg.position}`);
        card.style.display = "hidden"; 
        card = document.getElementById(`card${msg.image}`); 
        card.style.display = "hidden"; 
        
      }
    }
  }; 
}