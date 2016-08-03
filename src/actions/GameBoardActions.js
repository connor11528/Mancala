import API from '../API'

const GameBoardActions = {

  getAllGameBoards(){
    API.getAllGameBoards();
  },
  addNewGameBoard(game){
    console.log("add game: ", game )
    API.addNewGameBoard(game);
  },
  getGameBoard(gameboard) {
    API.getGameBoard(gameboard);
  },
  updateGameBoard(gameboard){
    console.log("update gmeboard:", gameboard)
    API.updateGameBoard(gameboard);
  }
}

export default GameBoardActions
