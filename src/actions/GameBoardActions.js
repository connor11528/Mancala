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
  updateGameBoard(game){
    console.log("update game:", game)
    API.updateGameBoard(game);
  }
}

export default GameBoardActions
