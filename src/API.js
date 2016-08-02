import { get, post, ajax } from 'jquery'

import ServerActions from './actions/ServerActions'

const API = {
  getAllGameBoards() {
    get('/api/gameboards')
      .done(response => { ServerActions.receiveGameBoards(response) })
  },

  addNewGameBoard(gameBoard) {
    post('/api/gameboards', gameboards)
      .done(response => { ServerActions.receiveOneTenant(response) })
  },

  updateGameBoard(gameboard) {
    fetch('/api/gameboards', {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(gameboard)
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
