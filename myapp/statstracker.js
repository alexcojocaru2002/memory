/** 
 * Stats tracker
 */

const gameStats = {
  since : Date.now(),
  gamesStarted: 0, // Games started
  gamesInitialized: 0,
  gamesCompleted: 0, // Games completed 
}; 

module.exports = gameStats; 