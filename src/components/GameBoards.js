import React, { Component } from 'react'
import AddGameBoardForm from './AddGameBoardForm'
import GameBoardsDisplay from './GameBoardsDisplay'

import GameBoardActions from '../actions/GameBoardActions'
import GameBoardStore from '../stores/GameBoardStore'

let _getComponentState = () => {
  return {
    gameboards: GameBoardStore.getAllGameBoards()
  }
}

export default class GameBoards extends Component {
  constructor(props){
    super(props);

    this.state = _getComponentState()

    console.log("this.state", this.state);
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount() {
    GameBoardActions.getAllGameBoards();
    GameBoardStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    GameBoardStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState(_getComponentState())
  }

  render() {
    return (
    <div>
        <h1>GameBoards</h1>

        <div>
          <AddGameBoardForm addGameBoard={this.AddGameBoard} />
        </div>

        <div>
          <GameBoardsDisplay gameboards={this.state.gameboards} />
        </div>


      </div>
    )
  }
}

    
