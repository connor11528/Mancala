import API from '../API'

const GameBoardActions = {

  getAllGameBoards(){
    API.getAllGameBoards();
  },
  addNewGameBoard(players){
    console.log("players: ", players )
    API.addNewGameBoard(players);
  },
  getGameBoard(id) {
    API.getGameBoard(id);
  },
  updateGameBoard(game){
    console.log("update game:", game)
    API.updateGameBoard(game);
  }
}

export default GameBoardActions
