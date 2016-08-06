import React, { Component } from 'react'
import GameBoard from './GameBoard';

import ioClient from 'socket.io-client';

export default class GameBoardDisplay extends Component {
  constructor(props){
    super(props);
    //console.log("THIS.PROPS\n", this.props);
  }

  render() {
    let { gameboards } = this.props
    //console.log("\ngameboards:" ,gameboards)

    //match gameboard to game room socketID
    let display = gameboards.length && gameboards.map(gameboardID => <GameBoard key={gameboardID} gameboardID = {gameboardID} />);

    //console.log('display', display);
    //console.log('display', display.length-1);
    return (
        <div >
          { display[display.length-1] || 'No GameBoards To Display'}
        </div>

    )
  }
}
