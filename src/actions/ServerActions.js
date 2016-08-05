import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receiveGameBoards(gameboards) {
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_GAMEBOARDS',
      gameboards
    });
  },
  receiveOneGameBoard(gameboard) {
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_ONE_GAMEBOARD',
      gameboard
    });
  }
}

export default ServerActions
