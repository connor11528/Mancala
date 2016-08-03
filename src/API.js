import { get, post, ajax } from 'jquery'

import ServerActions from './actions/ServerActions'

const API = {
  getAllGameBoards() {
    get('/api/gameboards')
      .done(response => { ServerActions.receiveGameBoards(response) })
  },

  getGameBoard(gameboardId){
     get('/api/gameboards/' + gameboardId)
      .done(response => { ServerActions.receiveGameBoard(response) })
  },

  addNewGameBoard(gameboard) {
    console.log("gameboard in API.js:", gameboard);
    ajax({
      type: 'POST',
      url: '/api/gameboards',
      data: {game: JSON.stringify(gameboard)},
      dataType: 'json'
     }) 
    .done(response => { ServerActions.receiveOneGameBoard(response) })
  },

  updateGameBoard(gameboard) {
    fetch('/api/gameboards', {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({gameboard: gameboard})
    })
      .then((res) => res.json())
      .then(data => {
        console.log(data);
      })
  },

  deleteGameBoard(gameBoardID) {
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
