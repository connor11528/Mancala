import mongoose, { Schema } from 'mongoose'

let Game;

let gameSchema = Schema({
  currPlayer: {type: Boolean, default: false},
  gameboard : {type: [Number], default: [0,4,4,4,4,4,4,0,4,4,4,4,4,4] }
});


Game = mongoose.model('Game', gameSchema);

export default Game;


/*,
        {
          position: String,
          stones: Number,
          index: 1
        },
        {
          position: String,
          stones: Number,
          index: Number
        },
        {
          position: String,
          stones: Number,
          index: Number
        },
        {
          position: String,
          stones: Number,
          index: Number
        },
        {
          position: String,
          stones: Number,
          index: Number
        },
        {
          position: String,
          stones: Number,
          index: Number
        },
        {
          position: String,
          stones: Number,
          index: Number
        },
        {
          position: String,
          stones: Number,
          index: Number
        },
        {
          position: String,
          stones: Number,
          index: Number
        },
        {
          position: String,
          stones: Number,
          index: Number
        },
        {
          position: String,
          stones: Number,
          index: Number
        },
        {
          position: String,
          stones: Number,
          index: Number
        },
        {
          position: String,
          stones: Number,
          index: Number
        }*/