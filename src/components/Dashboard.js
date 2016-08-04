import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Dashboard extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className = "container">
        <h1>Welcome to Mancala</h1>
        <div>
          <Link className = "btn btn-primary" Link to="gameBoards">Shared Screen Game</Link>
       </div>
      </div>
    )
  }
}
