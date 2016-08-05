import { get, post, ajax } from 'jquery'

import ServerActions from './actions/ServerActions'

const API = {
  getAllGameBoards() {
    get('/api/gameboards')
      .done(response => { ServerActions.receiveGameBoards(response) })
  },

  getGameBoard(gameboardId){
    //console.log("gameboardID", gameboardId)
     get('/api/gameboards/' + gameboardId)
      .done(response => { ServerActions.receiveOneGameBoard(response) })
  },

  addNewGameBoard(players) {
    console.log('players:', players);
    ajax({
      type: 'POST',
      url: '/api/gameboards',
      data: players,
      dataType: 'json'
     }) 
    .done(response => { ServerActions.receiveOneGameBoard(response) })
  },

  updateGameBoard(game) {
    console.log("Game: ", game);
    //console.log('game.gameboard', game.gameboard);
    //console.log('game.currPlayer', game.currPlayer);
    //console.log('game.gameboard', game.gameboard);

    fetch('/api/gameboards', {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(game)
    })
      .then((res) =>res.json())
      .then(data => {
        console.log("data:", data);
         ServerActions.receiveOneGameBoard(data) //same call as get origional gameboard (might be problem)
      })
  },

  deleteGameboard(gameBoardID) {
    fetch('/api/gameboards/' + gameBoardID, {
      method: 'DELETE'
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        ServerActions.receiveGameBoards(data)
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export default API
