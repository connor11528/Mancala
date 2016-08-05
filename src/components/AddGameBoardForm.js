import React, { Component } from 'react'
import GameBoard from './GameBoard'
import { Link } from 'react-router'

import ioClient from 'socket.io-client';

import GameBoardActions from '../actions/GameBoardActions'

export default class AddGameBoardForm extends Component {
  constructor(props){
    super(props);

    console.log("props", this.props)

   /* this.state = {
      gameboard : [0,4,4,4,4,4,4,0,4,4,4,4,4,4],//new Array(14).fill(0,4,4,4,4,4,4,0,4,4,4,4,4,4),
      currPlayer: false
    }*/

    this.initializeBoard = this.initializeBoard.bind(this);
  }

  initializeBoard(event){
    event.preventDefault();
    console.log("initializeing Board")
    //console.log("this.state", this.state);
    //console.log("add :", this.state.gameboard);
    GameBoardActions.addNewGameBoard();
  }

  render() {
    return (
      <div>
            <button className="btn btn-default"
            onClick={this.initializeBoard}
            >Init Board</button>
      </div>
      )
  }
}



/* {
          position: 'bucket0',
          stones: 0,
          index: 0
        },
        {
          position: 'row0',
          stones: 0,
          index: 1
        },
        {
          position: 'row0',
          stones: 0,
          index: 2
        },
        {
          position: 'row0',
          stones: 0,
          index: 3
        },
        {
          position: 'row0',
          stones: 0,
          index: 4
        },
        {
          position: 'row0',
          stones: 0,
          index: 5
        },
        {
          position: 'row0',
          stones: 0,
          index: 6
        },
        {
          position: 'bucket1',
          stones: 0,
          index: 7
        },
        {
          position: 'row1',
          stones: 0,
          index: 8
        },
        {
          position: 'row1',
          stones: 0,
          index: 9
        },
        {
          position: 'row1',
          stones: 0,
          index: 10
        },
        {
          position: 'row1',
          stones: 0,
          index: 11
        },
        {
          position: 'row1',
          stones: 0,
          index: 12
        },
        {
          position: 'row1',
          stones: 0,
          index: 13
        }
      ],*/
    /*let hole = {
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

      //gameArr.push(hole);
      //this.state.gameboard.push(hole);
      this.setState({gameboard: this.state.gameboard.concat([hole])})
      //console.log(this.state.gameboard);
      //console.log("Add " , hole.position, "to gameboard with", hole.stones, "stones")
    }
    console.log("this.state", this.state);
    //this.setState({gameboard: this.state.gameboard});
    GameBoardActions.addNewGameBoard(this.state);
    this.setState({gameboard: []} )
    }
  }*/
