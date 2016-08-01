import API from '../API'

const GameBoardActions = {


  getStones() {
    API.getAllTenants();
  },
  moveStones(gameBoard){
    API.addNewTenant(gameBoard);
  }
}

export default GameBoardActions
