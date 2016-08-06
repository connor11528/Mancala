import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let __gameboards = [];
let __gameboardsbyid = {};
//let _currplayer = 0;

class GameBoardsStore extends EventEmitter {
  constructor(props){
    super(props);

     AppDispatcher.register(action => {
      switch(action.actionType) {
        case 'RECEIVE_GAMEBOARDS':
          __gameboards = action.gameboards.map( gameboard => gameboard._id); 
          
          //for in loop populate gameboards
          this.emit('CHANGE');
          break;
        case 'RECEIVE_ONE_GAMEBOARD':
          //__gameboards.push(action.gameboard);
          // __gameboardsbyid[gameboard._id] = action.gameboard;
          //console.log("action.gameboard: ", action.gameboard)
          __gameboardsbyid[action.gameboard._id] = action.gameboard;
          //__gameboards.push(action.gameboard._id);
          this.emit('CHANGE');
          break;
       /*case 'RECEIVE_UPDATED_GAMEBOARD':
          //__gameboards.push(action.gameboard);
          // __gameboardsbyid[gameboard._id] = action.gameboard;
          console.log("action.gameboard: ", action.gameboard)
          __gameboardsbyid[action.gameboard._id] = action.gameboard;
          //__gameboards.push(action.gameboard._id);
          this.emit('CHANGE');
          break;*/
      }
    });
  }

  getAllGameBoards() {
    return __gameboards;
  }

  getGameBoard(id){
    return __gameboardsbyid[id];
  }

  startListening(cb) {
    this.on('CHANGE', cb)
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb)
  }
}

export default new GameBoardsStore();
