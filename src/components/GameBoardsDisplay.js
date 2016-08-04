import React, { Component } from 'react'
import GameBoard from './GameBoard';

export default class GameBoardDisplay extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let { gameboards } = this.props
    let display = gameboards.length && gameboards.map(gameboard => <GameBoard key={gameboard._id} gameboard={gameboard} />);

    return (
        <div >
          { display || 'No GameBoards To Display'}
        </div>

    )
  }
}
