import React, { Component } from 'react'
import GameBoard from './GameBoard';

import ioClient from 'socket.io-client';

export default class GameBoardDisplay extends Component {
  constructor(props){
    super(props);
    console.log("THIS.PROPS\n", this.props);
  }

  render() {
    let { gameboards } = this.props
    console.log("\ngameboards:" ,gameboards)

    //match gameboard to game room socketID
    let display = gameboards.length && gameboards.map(gameboardID => <GameBoard key={gameboardID} gameboardID = {gameboardID} />);
    console.log(display[0]);
    return (
        <div >
          { display[0] || 'No GameBoards To Display'}
        </div>

    )
  }
}
