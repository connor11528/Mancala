import React, { Component } from 'react'
import AddGameBoardForm from './AddGameBoardForm'
import GameBoardsDisplay from './GameBoardsDisplay'

import BallDisplay from './BallDisplay'

import GameBoardActions from '../actions/GameBoardActions'
import GameBoardStore from '../stores/GameBoardStore'
import css from './style.css'

import ioClient from 'socket.io-client';


export default class GameBoard extends Component {
  constructor(props){
    super(props);
   /* this.state = {
      gameboard: GameBoardActions.getGameBoard(this.props.gameboardID)
    }*/
    this.startingPos = this.startingPos.bind(this);
    this.onChange = this.onChange.bind(this);
    this.newGame = this.newGame.bind(this);

    const host = location.origin.replace(/^http/, 'ws')
    const socket = ioClient.connect(host)
  }

  componentDidMount(){
    GameBoardActions.getGameBoard(this.props.gameboardID);
    GameBoardStore.startListening(this.onChange);

    console.log("ioclient:", ioClient);

    ioClient.on('connect', function(){
      console.log('new game');
      ioClient.emit('newGame')
    });

    //console.log("GameBoardStore.getGameBoard(this.props.gameboardID):", GameBoardStore.getGameBoard(this.props.gameboardID))
    //console.log("game board id:",this.props.gameboardID )
  }

  onChange(){
    console.log("change, set state to: ", GameBoardStore.getGameBoard(this.props.gameboardID) )
    this.setState({gameboard: GameBoardStore.getGameBoard(this.props.gameboardID)})
    //console.log("GameBoardStore.getGameBoard(this.props.gameboardID):", GameBoardStore.getGameBoard(this.props.gameboardID))
  }

  componentWillUnmount(){
    GameBoardStore.stopListening(this.onChange);
  }

  newGame(){
    //event.preventDefault();
    GameBoardActions.deleteGameBoard(this.props.gameboardID);
    window.location = '/';

  }


   startingPos(event) {
    event.preventDefault();
    console.log("CLICKKKKKKKKK")
    //swal({   title: "Error!",   text: "Here's my error message!",   type: "error",   confirmButtonText: "Cool" });

    console.log('this.state:', this.state)

    var stones = this.state.gameboard.gameboard.slice();
    var player =  this.state.gameboard.currPlayer;
    console.log("stones:", stones);
    console.log('player:', player);


    var holeIndex =  parseInt(event.target.id);

    //Pick Up Stones
    var stonesInHand = stones[holeIndex];
    stones[holeIndex] = 0;

    let count = 0;
    var index = (holeIndex + 13)%14;

    while(count < stonesInHand){

      //skip oppositeplayers bucket
      if( (index === 7 && player === true)|| (index === 0 && player === false)){
         console.log("skip bucket: ", index);
         index = ((index + 13) % (14));
      }

      //if not other player's bucket, deposit stones
      else{

       //drop stone in hole
       stones[index]++;
       count++;
       console.log("index:", index);
       console.log("stones[index]", stones[index]);

        //if last stones lands in empty hole on your own side, collect pieces from opposite hole
        if(count  ===  stonesInHand && stones[index] === 1){

          //check if player1/row0 player0/row1  top row is plyer 1's bottom row is player 0s
          if( ((index > 0 && index < 7)  && player === false ) || ((index > 7 && index < 14) && player === true) ) {

          //capture that piece and any piece on opposite side
          //1->13, 2->12, 3->11, 4 ->10, 5->9, 6->8
          //var opposite;

          var opposite = 14-index;

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

        //if stone doesn't land in your bucket go to next player
        if(count  ===  stonesInHand){
          if( (index === 0 && player === true ) || ( index ===7 && player === false) ){
            console.log("land in own bucket")
          }
        else{
          player = !player;  
          console.log("switch to player: ", player)
        }
      }

        //check for win
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

        //if winner set gameover
        //add swal
        if(row0Count === 0 ){
          let winner = 'player 0';
          console.log("---------winner: ", winner);
          console.log("---------score: ", stones[0]);
          alert(this.state.gameboard.player0 , 'wins with ', stones[7], 'stones')
          stones = [0,4,4,4,4,4,4,0,4,4,4,4,4,4];
          break;
        }
        else if (row1Count ===0){
          let winner = 'player 1';
          console.log("---------winner: ", winner);
          console.log("---------score: ", stones[7]);
          alert(this.state.gameboard.player1 , 'wins with ', stones[0], 'stones')
          stones = [0,4,4,4,4,4,4,0,4,4,4,4,4,4];

          break;
        }
      index = ((index + 13)%(14));
      }
    }

    let newgameboard = {
      _id: this.props.gameboardID,
      gameboard: stones,
      currPlayer: player
    }

    console.log("newgameboard:", newgameboard);
    GameBoardActions.updateGameBoard(newgameboard);
    //console.log("game" ,this.state.gameboard.gameboard);
    //console.log("this.state.gameboard.gameboard.currPlayer" ,this.state.gameboard.gameboard.currPlayer);
  }

  render() {
    console.log("this.state" , this.state)
     if(this.state){

      let name;
      if(this.state.gameboard.currPlayer){
         name = this.state.gameboard.player1;
      }
      else{
         name = this.state.gameboard.player0;
      }

    console.log("this.state", this.state);
    console.log('this.props', this.props);
 //console.log("this.state", this.state.gameboard.gameboard);
    //let gameboard = this.state.gameboard.gameboard;

    var rotate90 = {
      position: 'absolute',
      top: '10px',
      WebkitTransform: 'rotate(90deg)',
      MozTransform: 'rotate(90deg)',
      OTransform: 'rotate(90deg)',
      msTransform: 'rotate(90deg)',
      transform: 'rotate(90deg)'
    }

    var rotateN90 = {
      position: 'absolute',
      top: '10px',
      WebkitTransform: 'rotate(-90deg)',
      MozTransform: 'rotate(-90deg)',
      OTransform: 'rotate(-90deg)',
      msTransform: 'rotate(-90deg)',
      transform: 'rotate(-90deg)'
    }

    var letter90 = {

      WebkitTransform: 'rotate(90deg)',
      MozTransform: 'rotate(90deg)',
      OTransform: 'rotate(90deg)',
      msTransform: 'rotate(90deg)',
      transform: 'rotate(90deg)'
    }


    var letterN90 = {
      WebkitTransform: 'rotate(-90deg)',
      MozTransform: 'rotate(-90deg)',
      OTransform: 'rotate(-90deg)',
      msTransform: 'rotate(-90deg)',
      transform: 'rotate(-90deg)'
    }

   var board = {
      zIndex: -2,
      height: 250,
      borderRadius: 30,
      width: '760px',
      boxShadow: 'inset 0px 3px 30px 3px #000000'

     };

     var bucket0 = {
      float: 'left',
      borderRadius: 10,
      border: '1px solid black',
      marginTop: '25px',
      marginLeft: '20px',
      paddingTop: '10px',
      paddingLeft:'4px',
      paddingRight: '4px',
      width: '70px',
      height: 200,
      display: 'inline-block',
      position: 'relative',
      boxShadow: 'inset 5px 5px 30px #000000',
      color: 'pink'
     };

     var bucket1 = {
      float:'right',
      borderRadius: 10,
      border: '1px solid black',
      width: '70px',
      height: 200,
      marginTop: '25px',
      marginRight: '20px',
      paddingTop: '10px',
      paddingLeft:'4px',
      paddingRight: '4px',
      display: 'inline-block',
      position: 'relative',
      marginleft: '-20px',
      boxShadow: 'inset 5px 5px 30px #000000',
      color: 'red'
     };

     var holes = {
      display: 'inline-block',
      width: '76%',
      height: '80%',
      paddingLeft: '10px',
      position: 'relative',
      top: '35px',
      };

     var row1 = {
      /*paddingBottom: '50px'*/
     };

     var row2 = {

     };

     var hole = {
      zIndex: '3',
      float: 'left',
      border: '1px solid black',
      height: '75px',
      paddingTop: '5px',
      paddingLeft: '3px',
      paddingRight: '3px',
      width: '77px',
      marginBottom: '23px',
      borderRadius: 25,
      color: 'blue',
      margin: '8px',
      fontSize: '100%',
      boxShadow: 'inset 5px 5px 25px #000000',
      opacity: 1,

      };

      var bottom = {
        position: 'relative',
        bottom: '-520px'
      }

      //console.log("length:", this.state.gameboard.gameboard.length)
      var ballstoDisplay = []
      for(let i =0; i< this.state.gameboard.gameboard.length; i++){
        let numballs = this.state.gameboard.gameboard[i];
        //console.log('numballs: ', numballs, ' at i', i);
        let ballHtml = []
        for(let k=0; k<numballs; k++){
          ballHtml.push(<BallDisplay className = 'ballspan'/>)
        }
        ballstoDisplay.push(ballHtml);
        //console.log("ballstoDisplay", ballstoDisplay[i]);
      }

      if(!this.state.gameboard.currPlayer) { 
        var rotate = rotate90 ; 
        var opRotate = letterN90;
        var hov0 = 'hoverHole'
        var hov1 = '';
        var click0 = this.startingPos
        var click1 = null;
      }
      if(this.state.gameboard.currPlayer) { 
        var rotate = rotateN90; 
        var opRotate = letter90;
        var hov0 = '';
        var hov1 = 'hoverHole'
        var click1 = this.startingPos
        var click0 = null;
      }


    return (
      <div>

      <button className = 'btn btn-warning title newgamebtn font' onClick = {this.newGame}>New Game</button>
      <h4 className = 'title name font'>{name}'s turn</h4>
      <div className = 'fullwidth'>
        <div style = {rotate} className = "gameContainer">
          <div style={board} className = 'background'>
            <span style={bucket0} id='0'> <div> </div> {ballstoDisplay[0]} <div className = "stoneNum2"> {this.state.gameboard.gameboard[0]}</div></span>
            <span style={holes}>

              <div style={row1}>
                <span style={hole} className = {hov0} onClick={click0} id='1'> {ballstoDisplay[1]} <div className = "stoneNum" style = {opRotate} > {this.state.gameboard.gameboard[1]}</div></span>
                <span style={hole} className = {hov0} onClick={click0} id='2'> {ballstoDisplay[2]} <div  className = "stoneNum" style = {opRotate} >{this.state.gameboard.gameboard[2]} </div></span>
                <span style={hole} className = {hov0} onClick={click0} id='3'> {ballstoDisplay[3]} <div className = "stoneNum" style = {opRotate} >{this.state.gameboard.gameboard[3]} </div></span>
                <span style={hole} className = {hov0} onClick={click0} id='4'> {ballstoDisplay[4]} <div className = "stoneNum" style = {opRotate} >{this.state.gameboard.gameboard[4]} </div></span>
                <span style={hole} className = {hov0} onClick={click0} id='5'> {ballstoDisplay[5]} <div className = "stoneNum" style = {opRotate} >{this.state.gameboard.gameboard[5]} </div></span>
                <span style={hole} className = {hov0} onClick={click0} id='6'> {ballstoDisplay[6]} <div className = "stoneNum" style = {opRotate} >{this.state.gameboard.gameboard[6]} </div></span>
              </div>

              <div style ={row2}>
                <span style ={hole} className = {hov1} onClick={click1} id='13'> {ballstoDisplay[13]} <div className = "stoneNum2" style = {opRotate} > {this.state.gameboard.gameboard[13]}</div></span>
                <span style ={hole} className = {hov1} onClick={click1} id='12'>{ballstoDisplay[12]} <div className = "stoneNum2" style = {opRotate} > {this.state.gameboard.gameboard[12]}</div></span>
                <span style ={hole} className = {hov1} onClick={click1} id='11'>{ballstoDisplay[11]} <div className = "stoneNum2" style = {opRotate} > {this.state.gameboard.gameboard[11]}</div></span>
                <span style ={hole} className = {hov1} onClick={click1} id='10'> {ballstoDisplay[10]} <div className = "stoneNum2" style = {opRotate} > {this.state.gameboard.gameboard[10]}</div></span>
                <span style ={hole} className = {hov1} onClick={click1} id='9'>{ballstoDisplay[9]} <div className = "stoneNum2" style = {opRotate} > {this.state.gameboard.gameboard[9]}</div></span>
                <span style ={hole} className = {hov1} onClick={click1} id='8'>{ballstoDisplay[8]} <div className = "stoneNum2" style = {opRotate} > {this.state.gameboard.gameboard[8]}</div></span>
              </div>
            </span>

            <span style = {bucket1} id = '7'><div> </div>{ballstoDisplay[7]} <div className = "stoneNum2"> {this.state.gameboard.gameboard[7]}</div></span>
          </div>
        </div>
      </div>

      </div>
    )
    }
    else{
      return (
        <div ></div>
      )
    }


  }
}
