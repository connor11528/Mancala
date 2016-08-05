import API from '../API'

const GameBoardActions = {

  getAllGameBoards(){
    API.getAllGameBoards();
  },
  addNewGameBoard(players){
    console.log("players: ", players )
    API.addNewGameBoard(players);
  },
  deleteGameBoard(id){
    console.log('delete by id')
    API.deleteGameboard(id);
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
