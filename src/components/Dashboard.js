import React, { Component } from 'react'
import { Link } from 'react-router'
import GameBoard from './GameBoard'
//const uuid = require('uuid');

import ioClient from 'socket.io-client';

import GameBoardActions from '../actions/GameBoardActions'

export default class Dashboard extends Component {
  constructor(props){
    super(props);

    this.state = {
      player0: '',
      player1: ''
    }


  this.initializeBoard = this.initializeBoard.bind(this);

  }

  initializeBoard(event){
    //console.log('socket:', socket);
    event.preventDefault();
    console.log("initializeing Board")
    GameBoardActions.addNewGameBoard(this.state);
    window.location = `/gameBoards`//${this.state.playersId}`;
  }


  render() {
    return (
      <div>
        <div className = ' text-center'>
        <h1 className = "title2">Mancala</h1>
          

        <form className = 'playerForm font'>  
          <div className="form-group">
            <label htmlFor="tenantName">Player 1</label>
            <input type="text"
            className="form-control"
            id="player1"
            value={this.state.player0}
            onChange={e => this.setState({player0: e.target.value})}
            />

          </div>
          <div className="form-group">
            <label htmlFor="tenantEmail">Player 2</label>
            <input type="text"
                  className="form-control"
                  id="player2"
                  value={this.state.player1}
                  onChange={e => this.setState({player1: e.target.value})}
            />
          </div>

              <button className = 'btn btn-success font startbtn' onClick={this.initializeBoard}> New Game</button>

        </form>


       </div>
      </div>
    )
  }
}
