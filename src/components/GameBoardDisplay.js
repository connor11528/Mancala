import React, { Component } from 'react'
import GameBoard from './GameBoard';

export default class GameBoardDisplay extends Component {
  constructor(props){
    super(props);

    this.state = {
      gameboard:  this.props.gameboard,
      currPlayer: this.props.currPlayer,
      index: this.props.index
    }
    this.startingPos = this.startingPos.bind(this);

  }

  startingPos(event) {
    var gameOver = false;
    event.preventDefault();
    var holeIndex =  parseInt(event.target.id);
    //var player = this.state.currPlayersssssssssssssssssssssssss


    var stonesInHand = this.state.gameboard[holeIndex].stones;
    this.state.gameboard[holeIndex].stones = 0;
    console.log(this.state.gameboard[holeIndex].stones, " should be 0")

    let count  =0;
    //var index = holeIndex+1;
    var index = (holeIndex + (this.state.gameboard.length) + 1) % (this.state.gameboard.length);
    console.log("starting at hole:", index);

    while(count < stonesInHand ){
      console.log("stone" , count ," of ", stonesInHand);

      //skip opposite  players bucshhketssd 
      if((this.state.gameboard[index].position === 'bucket0' && this.state.currPlayer === true)|| (this.state.gameboard[index].position === 'bucket1' && this.state.currPlayer === false)){
         console.log("\n skip bucket");
         index = (index + (this.state.gameboard.length) + 1) % (this.state.gameboard.length)
      }
      else{

        this.state.gameboard[index].stones++;
        console.log("Add stone to", index )
        count++;

        //if land in empty hole son your own side, collect pieces from hoel and opposite
        if(count  ===  stonesInHand && this.state.gameboard[index].stone === 0){
          console.log("land in empty hole")
          if( (this.state.gameboard[index].position === 'row0' && this.state.currPlayer === 0 ) || (this.state.gameboard[index].position === 'row1' && this.state.currPlayer === 1) ) {
            console.log("in correct row")
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

          if(this.state.currPlayer === 0){
            this.state.gameboard[0] += (this.state.gameboard[opposite] +1);
            this.state.gameboard[opposite] = 0;
            this.state.gameboard[index] = 0;
          }

          else{
            this.state.gameboard[7] += (this.state.gameboard[opposite] +1);
            this.state.gameboard[opposite] = 0;
            this.state.gameboard[index] = 0;
          }
        }
       }

        console.log("count", count);
        console.log("index:", index);
        console.log("stonesInHand", stonesInHand);
        console.log("position" , this.state.gameboard[index].position);
        console.log("player:", this.state.currPlayer);
        //if dont lands in your bucket go to next playerz
        if(count  ===  stonesInHand){
          if( (this.state.gameboard[index].position === 'bucket0' && this.state.currPlayer === false ) || (this.state.gameboard[index].position === 'bucket1' && this.state.currPlayer === true) ){
            console.log("land in own bucket")
          }
          else{
            console.log("player: ", this.state.currPlayer)
            this.state.currPlayer = !this.state.currPlayer;
            console.log("player: ", this.state.currPlayer)
          }
        }

        //check for win d
        var row0Count =0;
        var row1Count =0;

        for(var i=0; i<6; i++){
          if(this.state.gameboard[i+1].stones !== 0){
            row0Count++;
          }

          if(this.state.gameboard[i+8].stones !== 0){
            row1Count++;
          }
        }

        if(row0Count === 0 || row1Count === 0){
          gameOver = true;
          var winner;
          if(this.state.gameboard[0].stones > this.state.gameboard[7].stones){
            winner = 'player 0';
            console.log("---------winner: ", winner);
          }
          else{
            winner = 'player 1';
            console.log("---------winner: ", winner);
          }
          break;
          }

          index = (index + (this.state.gameboard.length) + 1) % (this.state.gameboard.length);
      }
    }
  }
    //xs
    //this.state.currPlayer.setState({currPlayer: !this.props.currPlayer}); 


  render() {

    //let { gameboard } = this.props
    //change 

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

      <h1>Player {this.state.currPlayer*1}'s turn</h1>

        <div style = {board}>
          <span style = {bucket1} id = {this.props.gameboard[0].index}>{this.props.gameboard[0].stones}</span>
          <span style = {holes}>

            <div style = {row1}>
              <span style = {hole} onClick={this.startingPos} id = {this.state.gameboard[1].index}>{this.state.gameboard[1].stones}</span>
              <span style = {hole} onClick={this.startingPos} id = {this.state.gameboard[2].index}>{this.state.gameboard[2].stones}</span>
              <span style = {hole} onClick={this.startingPos} id = {this.state.gameboard[3].index}>{this.state.gameboard[3].stones}</span>
              <span style = {hole} onClick={this.startingPos} id = {this.state.gameboard[4].index}>{this.state.gameboard[4].stones}</span>
              <span style = {hole} onClick={this.startingPos} id = {this.state.gameboard[5].index}>{this.state.gameboard[5].stones}</span>
              <span style = {hole} onClick={this.startingPos} id = {this.state.gameboard[6].index}>{this.state.gameboard[6].stones}</span>
            </div>

            <div style = {row2}>
              <span style = {hole} onClick={this.startingPos} id = {this.state.gameboard[13].index}>{this.state.gameboard[13].stones}</span>
              <span style = {hole} onClick={this.startingPos} id = {this.state.gameboard[12].index}>{this.state.gameboard[12].stones}</span>
              <span style = {hole} onClick={this.startingPos} id = {this.state.gameboard[11].index}>{this.state.gameboard[11].stones}</span>
              <span style = {hole} onClick={this.startingPos} id = {this.state.gameboard[10].index}>{this.state.gameboard[10].stones}</span>
              <span style = {hole} onClick={this.startingPos} id = {this.state.gameboard[9].index}>{this.state.gameboard[9].stones}</span>
              <span style = {hole} onClick={this.startingPos} id = {this.state.gameboard[8].index}>{this.state.gameboard[8].stones}</span>
            </div>
          </span>

          <span style = {bucket2} id = {this.props[7]}>{this.props.gameboard[7].stones}</span>
        </div>

      </div>
    )
  }
}
