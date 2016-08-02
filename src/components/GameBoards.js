import React, { Component } from 'react'
import AddGameBoardForm from './AddGameBoardForm'
import GameBoardDisplay from './GameBoardDisplay'

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
    <div className="text-center row">
        <h1>GameBoards</h1>

        <div className="col-xs-6 col-xs-offset-3">
          <AddGameBoardForm addTenant={this.AddGameBoard} />
        </div>


      </div>
    )
  }
}

    
