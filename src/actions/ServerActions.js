import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receiveGameBoard(gameboard) {
    AppDispatcher.dispatch({
      actionType: 'RECIEVE_GAME_BOARD',
      gameboard
    });
  }
  
}

export default ServerActions
