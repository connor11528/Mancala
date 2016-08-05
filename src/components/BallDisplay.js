import React, { Component } from 'react'
export default class AddGameBoardForm extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <span className = 'ballspan'>
        <figure className="blueball"><span className="shadow"></span></figure>
        </span>
    )
  }
}
