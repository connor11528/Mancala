import React, { Component } from 'react'
import AddGameBoardForm from './AddGameBoardForm'
import GameBoardsDisplay from './GameBoardsDisplay'

import GameBoardActions from '../actions/GameBoardActions'
import GameBoardStore from '../stores/GameBoardStore'


export default class GameBoard extends Component {
  constructor(props){
    super(props);

    this.state = {
      gameboard: this.props.gameboard
    }

    console.log("this.props.gameboard in GameBoard.js: ", this.props.gameboard);
    this.startingPos = this.startingPos.bind(this)
  }

    //game logic on cloned gameboard
    //setState ({gameboard : clonedgameboard})
    //gameboardactions.updatess

   startingPos(event) {
    event.preventDefault();

    var stones = this.state.gameboard.gameboard;
    console.log("stones", stones)

    var player = this.state.gameboard.currPlayer;
    console.log('player:', player);

    var gameOver = false;
    var holeIndex =  parseInt(event.target.id);
    console.log("holeIndex:", holeIndex);

    //Pick Up Stones
    var stonesInHand = stones[holeIndex];
    stones[holeIndex] = 0;
    console.log("pick up ", stonesInHand, "stones from hole", holeIndex, ":",stones[holeIndex]);

    let count = 0;
    //index to loop around board
    //var index = holeIndex;
    var index = (holeIndex+1)%14;
    console.log("starting at hole:", index);

    while(count < stonesInHand ){
      //console.log("stone" , count ," of ", stonesInHand);
      //console.log("on hole:", index);

      //skip oppositeplayers bucket
      if( (index === 7 && player === true)|| (index === 0 && player === false)){
         console.log("skip bucket: ", index);
         index = ((index + 1) % (14));
      }

      //if not other player's bucket, deposit stones
      else{

       //drop stone in hole
       stones[index]++;
       console.log(stones[index] , " stones in hole", index )
       count++;

        //if last stones lands in empty hole on your own side, collect pieces from opposite hole
        if(count  ===  stonesInHand && stones[index] === 1){
          console.log("land in empty hole")
          //check if player1/row0 player0/row1  top row is plyer 1's bottom row is player 0s
          if( ((index > 0 && index < 7)  && player === false ) || ((index > 7 && index < 14) && player === true) ) {
          console.log("in opposite row")
          //capture that piece and any piece on opposite side
          //1->13, 2->12, 3->11, 4 ->10, 5->9, 6->8
          var opposite;
          if(index === 1){opposite = 13;}
          if(index === 2 ){opposite = 12;}
          if(index === 3 ){opposite = 11;}
          if(index === 4 ){opposite = 10;}
          if(index === 5 ){opposite = 9;}
          if(index === 6 ){opposite = 8;}
          if(index === 8 ){opposite = 6;}
          if(index === 9 ){opposite = 5;}
          if(index === 10 ){opposite = 4;}
          if(index === 11 ){opposite = 3;}
          if(index === 12 ){opposite = 2;}
          if(index === 13 ){opposite = 1;}


          //collect last stone and opposite stones

          if(player === false){
            stones[7] += (stones[opposite] +1);
            stones[opposite] = 0;
            stones[index] = 0;
          }

          else{
            stones[0] += (stones[opposite] +1);
            stones[opposite] = 0;
            stones[index] = 0;
          }
        }
       }

        /*console.log("count:", count);
        console.log("index:", index);
        console.log("stonesInHand", stonesInHand);
        console.log("position" , index);
        console.log("player:", player);*/

        //if stone doesn't land in your bucket go to next player
        if(count  ===  stonesInHand){
        console.log("last stone");
          if( (index === 0 && player === true ) || ( index ===7 && player === false) ){
            console.log("land in own bucket")
          }
        else{
          player = !player;
          console.log("switch to player: ", player)
        }
      }

        //check for win d
        var row0Count =0;
        var row1Count =0;

        for(var i=0; i<6; i++){
          if(stones[i+1] !== 0){
            row0Count += stones[i+1];
          }

          if(stones[i+8] !== 0){
            row1Count+= stones[i+8];
          }
        }

        if(row0Count === 0 ){
          let winner = 'player 0';
          console.log("---------winner: ", winner);
          console.log("---------score: ", stones[0]);
          break;
        }
        else if (row1Count ===0){
          let winner = 'player 1';
          console.log("---------winner: ", winner);
          console.log("---------score: ", stones[7]);
          break;
        }
      index = ((index + 1)%(14));
      }
    }

      console.log("stones:", stones);
      console.log("player: ", player);

    console.log("this, ", this.state);
 
    let newgameboard = {
      gameboard: stones,
      currPlayer: player
    }
    //let newgameboard = update(this.state.gameboard, { gameboard: {$set: stones}})

    this.setState({gameboard: newgameboard});
    //this.setState({gameboard: {currPlayer: player}} );
    GameBoardActions.updateGameBoard(this.state.gameboard);
    console.log("set player:?" , this.state.gameboard);
  }

  render() {

    let gameboard = this.state.gameboard;

    var board = {
      backgroundImage: 'url(' + 'http://bgfons.com/upload/wood%20_texture3177.jpg' + ')',
      height: 250,
      borderRadius: 30,
      width: '740px',
      boxShadow: 'inset 3px 1px 30px 3px #000000',
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

      <h4>Player {(this.state.gameboard.currPlayer)*1}'s turn</h4>

        <p>Player 0 right bucket and top row</p> 
        <p>Player 1 left bucket and bottom row</p> 
        <div style = {board}>
          <span style = {bucket1} id = '0'>{this.props.gameboard.gameboard[0]}</span>
          <span style = {holes}>

            <div style = {row1}>
              <span style = {hole} onClick={this.startingPos} id = '1'>{this.state.gameboard.gameboard[1]}</span>
              <span style = {hole} onClick={this.startingPos} id = '2'>{this.state.gameboard.gameboard[2]}</span>
              <span style = {hole} onClick={this.startingPos} id = '3'>{this.state.gameboard.gameboard[3]}</span>
              <span style = {hole} onClick={this.startingPos} id = '4'>{this.state.gameboard.gameboard[4]}</span>
              <span style = {hole} onClick={this.startingPos} id = '5'>{this.state.gameboard.gameboard[5]}</span>
              <span style = {hole} onClick={this.startingPos} id = '6'>{this.state.gameboard.gameboard[6]}</span>
            </div>

            <div style = {row2}>
              <span style = {hole} onClick={this.startingPos} id = '13'>{this.state.gameboard.gameboard[13]}</span>
              <span style = {hole} onClick={this.startingPos} id = '12'>{this.state.gameboard.gameboard[12]}</span>
              <span style = {hole} onClick={this.startingPos} id = '11'>{this.state.gameboard.gameboard[11]}</span>
              <span style = {hole} onClick={this.startingPos} id = '10'>{this.state.gameboard.gameboard[10]}</span>
              <span style = {hole} onClick={this.startingPos} id = '9'>{this.state.gameboard.gameboard[9]}</span>
              <span style = {hole} onClick={this.startingPos} id = '8'>{this.state.gameboard.gameboard[8]}</span>
            </div>
          </span>

          <span style = {bucket2} id = '0'>{this.state.gameboard.gameboard[7]}</span>
        </div>


      </div>
    )
  }
}
