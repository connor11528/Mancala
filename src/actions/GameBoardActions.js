import API from '../API'

const GameBoardActions = {

  initializeGameBoard(){
    var gameboard = [];
    console.log("initializeing Board")
    let hole = {
        position: 'test',
        stones: 0,
        index: i
    }
    for(var i =0; i<14; i++){
      //bucket1
      if(i === 0){
         hole = {
          position: 'bucket1',
          stones: 0,
          index: i
        }
      }
      if( i === 7){
        //bucet 2
         hole = {
          position: 'bucket2',
          stones: 0,
          index: i
        }
      }
      if(i > 0 && i<7){
        //player1 side
         hole = {
          position: 'side1',
          stones: 4,
          index: i
        }
      }
      else if(i>7 && i<=13){
        //player2side
         hole = {
          position: 'side2',
          stones: 4,
          index: i
        }
      }
      gameboard.push(hole);
    
      console.log(this.state.gameboard);
      console.log("Add " , hole.position, "to gameboard with", hole.stones, "stones")
    }

    API.initializeGameBoard(gameboard);
  },
  getGameBoard() {
    API.getGameBoard();
  },
  setGameBoard(){
    API.setGameBoard();
  }
}

export default GameBoardActions
