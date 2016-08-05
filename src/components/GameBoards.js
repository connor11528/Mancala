import React, { Component } from 'react'
import AddGameBoardForm from './AddGameBoardForm'
import GameBoardsDisplay from './GameBoardsDisplay'

import GameBoardActions from '../actions/GameBoardActions'
import GameBoardStore from '../stores/GameBoardStore'

import ioClient from 'socket.io-client';

let _getComponentState = () => {
  return {
    gameboards: GameBoardStore.getAllGameBoards()
  }
}

export default class GameBoards extends Component {
  constructor(props){
    super(props);

    this.state = _getComponentState()

    console.log("this.state in gameboards", this.state);
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount() {
    GameBoardActions.getAllGameBoards();
    GameBoardStore.startListening(this._onChange);
    console.log("after get", this.state.gameboards );
    socket = ioClient.connect();

    socket.on('newGame', function(data){ 
      console.log('socket data:', data);
    }) 

  }

  componentWillUnmount() {
    GameBoardStore.stopListening(this._onChange)

  }

  _onChange() {
    this.setState(_getComponentState())
    console.log("after on change", this.state.gameboards );


  }

  render() {
    return (
    <div>
        <div>
        <h2 className ='title'>Mancala</h2>

        {/*<div>
          <AddGameBoardForm addGameBoard={this.AddGameBoard} />
        </div>*/}

          <GameBoardsDisplay gameboards={this.state.gameboards} />
        </div>
      </div>
    )
  }
}

    
