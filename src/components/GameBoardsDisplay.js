import React, { Component } from 'react'
import GameBoard from './GameBoard';

import ioClient from 'socket.io-client';

export default class GameBoardDisplay extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let { gameboards } = this.props
    let display = gameboards.length && gameboards.map(gameboardID => <GameBoard key={gameboardID} gameboardID = {gameboardID} />);

    return (
        <div >
          { display || 'No GameBoards To Display'}
        </div>

    )
  }
}
