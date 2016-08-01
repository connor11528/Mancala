import React, { Component } from 'react'
import GameBoard from './GameBoard';

export default class GameBoardDisplay extends Component {
  constructor(props){
    super(props);

    this.startingPos = this.startingPos.bind(this);

  }

  startingPos(event) {


    event.preventDefault();
    console.log("this.props: ", this.props);
    console.log("event: ", event);

    //console.log("index", index);
  }

  render() {

    //let { gameboard } = this.props

    var board = {
      backgroundImage: 'url(' + 'http://bgfons.com/upload/wood%20_texture3177.jpg' + ')',
      height: 250,
      borderRadius: 30,
      width: '740px'
     };

     var bucket1 = {
      borderRadius: 10,
      border: '1px solid black',
      marginTop: 0,
      width: '60px',
      height: 200,
      display: 'inline-block',
      position: 'relative',
      bottom: '90px',
      boxShadow: 'inset 5px 5px 30px #000000',
      color: 'red'
     };

     var bucket2 = {
      borderRadius: 10,
      border: '1px solid black',
      width: '60px',
      height: 200,
      display: 'inline-block',
      marginTop: 25,
      position: 'relative',
      bottom: '90px',
      marginleft: '-20px',
      boxShadow: 'inset 5px 5px 30px #000000',
      color: 'red'
     };

     var holes = {
      display: 'inline-block',
      width: '76%',
      height: '90%',
      paddingBottom: '40px',
      position: 'relative',
      top: '60px'
      };

     var row1 = {
      marginBottom: '95px'

     };

     var row2 = {

     };

     var hole = {
      border: '1px solid black',
      padding: 32,
      borderRadius: 25,
      color: 'blue',
      margin: '10px',
      boxShadow: 'inset 5px 5px 25px #000000',
      }

    return (
      <div className="container">

        <div style = {board}>
          <span style = {bucket1}>0</span>
          <span style = {holes}>

            <div style = {row1}>
              <span style = {hole} onClick={this.startingPos}>4</span>
              <span style = {hole} onClick={this.startingPos}>4</span>
              <span style = {hole} onClick={this.startingPos}>4</span>
              <span style = {hole} onClick={this.startingPos}>4</span>
              <span style = {hole} onClick={this.startingPos}>4</span>
              <span style = {hole} onClick={this.startingPos}>4</span>
            </div>

            <div style = {row2}>
              <span style = {hole} onClick={this.startingPos}>4</span>
              <span style = {hole} onClick={this.startingPos}>4</span>
              <span style = {hole} onClick={this.startingPos}>4</span>
              <span style = {hole} onClick={this.startingPos}>4</span>
              <span style = {hole} onClick={this.startingPos}>4</span>
              <span style = {hole} onClick={this.startingPos}>4</span>
            </div>
          </span>

          <span style = {bucket2}>0</span>
        </div>

      </div>
    )
  }
}
