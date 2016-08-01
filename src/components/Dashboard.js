import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Dashboard extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="text-center">
        <h1>Welcome to Mancala</h1>
        <div className="container-fluid">
          <Link className = "btn btn-primary" Link to="gameBoard">2 Player</Link>
       </div>
      </div>
    )
  }
}
