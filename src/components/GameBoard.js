import React, { Component } from 'react'
import AddTenantForm from './AddTenantForm'
import GameBoardDisplay from './GameBoardDisplay'

import GameBoardActions from '../actions/GameBoardActions'
import GameBoardStore from '../stores/GameBoardStore'

let _getComponentState = () => {
  return {
    gameboard: [],//GameBoardStore.getGameBoard(),
    currPlayer: false
  }
}
//
export default class GameBoard extends Component {
  constructor(props){
    super(props);
    this.state = _getComponentState()
    this._onChange = this._onChange.bind(this)

    this.initializeBoard = this.initializeBoard.bind(this);
    this.initializeBoard();
  }

  componentDidMount() {
    GameBoardActions.getGameBoard();
    GameBoardStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    GameBoardStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState(_getComponentState())
  }



  initializeBoard(){
    console.log("initializeing Board")
    let hole = {
        position: 'test',
        stones: 0,
        index: i
    }
    for(var i =0; i<14; i++){
      if(i === 0){
        //bucket1
         hole = {
          position: 'bucket0',
          stones: 0,
          index: i
        }
      }
      if( i === 7){
        //bucet 2
         hole = {
          position: 'bucket1',
          stones: 0,
          index: i
        }
      }

      if(i > 0 && i<7){
        //player1 side
         hole = {
          position: 'row0',
          stones: 4,
          index: i
        }
      }

      else if(i>7 && i<=13){
        //player2side
         hole = {
          position: 'row1',
          stones: 4,
          index: i
        }
      }
      this.state.gameboard.push(hole);

      //this.setState({gameboard: this.state.gameboard.concat(hole)})
    
      //console.log(this.state.gameboard);
      //console.log("Add " , hole.position, "to gameboard with", hole.stones, "stones")
    }


  }
  render() {

    return (
      <div className="text-center row">
        <h1>Mancala</h1>
        <div className="col-xs-12">
          <GameBoardDisplay gameboard = {this.state.gameboard} currPlayer = {this.state.currPlayer}/>
        </div>

      </div>
    )
  }
}
