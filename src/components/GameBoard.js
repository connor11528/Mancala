import React, { Component } from 'react'
import AddTenantForm from './AddTenantForm'
import GameBoardDisplay from './GameBoardDisplay'

import GameBoardActions from '../actions/GameBoardActions'
import GameBoardStore from '../stores/GameBoardStore'

export default class GameBoard extends Component {
  constructor(props){
    super(props);

    this.state = {
      gameboard: []
    }

    this.initializeBoard = this.initializeBoard.bind(this);
  }

  initializeBoard(){

    //this.state.gameboard = [];
    //let hole;
    console.log("initializeBoard")

    let hole = {
        position: 'test',
        stones: 0,
        index: i
    }
    for(var i =0; i<13; i++){
      if(i === 0){
        //bucket1
         hole = {
          position: 'bucket1',
          stones: 0,
          index: i
        }
      }
      if( i === 6){
        //bucet 2
         hole = {
          position: 'bucket2',
          stones: 0,
          index: i
        }
      }

      if(i > 0 && i<6){
        //player1 side
         hole = {
          position: 'side1',
          stones: 4,
          index: i
        }
      }

      else if(i>6 && i<=13){
        //player2side
         hole = {
          position: 'side2',
          stones: 4,
          index: i
        }
      }

      this.state.gameboard.push(hole);
      //this.setState({gameboard: this.state.gameboard.concat(hole)});
      console.log("Add " , hole.position, "to gameboard with", hole.stones, "stones")
    }
  }


  render() {

    return (
      <div className="text-center row">
        <h1>Mancala</h1>
        <button className = 'btn' onClick = {this.initializeBoard}> initializeBoard</button>
        <div className="col-xs-12">
          <GameBoardDisplay gameboard = {this.state.gameboard} />
        </div>

      </div>
    )
  }
}
