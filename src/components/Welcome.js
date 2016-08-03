import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Welcome extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <div className="container-fluid">
          <Link className = "btn btn-primary" Link to="gameboards">2 Player</Link>
       </div>
    )
  }
}
