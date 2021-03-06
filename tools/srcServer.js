const express = require('express')
const webpack = require('webpack');

const path = require('path');
const config = require('../webpack.config');
const open = require('open');

//const dotenv = require('dotenv');
//dotenv.load();

const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const api = require('./api/index');
/* eslint-disable no-console */
const fs = require('fs');
//const SocketIo = ('socket.io';

const port = process.env.PORT || 3000;
const app = express();

const compiler = webpack(config);


const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/mancala');

const webpackMiddleware = require("webpack-dev-middleware");

app.use(webpackMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true
}));


console.log('here2')


app.use(require('webpack-hot-middleware')(compiler));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', api)

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

const server = app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    // open(`http://localhost:${port}`);
    console.log(`Listening at http://localhost:${port}`);
  }
});

//const io = new SocketIo(server, {path: '/api'})
const io = require('socket.io')(server);


//console.log('io', io);
//console.log("\nserver:", server)
var connections =0;

io.on('connection', function(socket) {

     console.log(`Clients connected: `, connections++);

    socket.join('room');

    socket.on('newGame', function(game) {
      connections++;
      console.log("game rooms connected:", connections)
      // TODO: Does the server need to know the user?
      console.log('new game, socket id', socket.id)
      socket.emit('receive socket', socket.id)
  })
})

  io.on('disconnect', function() {
    console.log('Disconnect.')
    console.log(`Clients -connected: `, connections--);
  });

/*var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;
  console.log("socket connect");
  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
})

server.listen(port, function() {
  console.log('Express server listening on port ' + port);
});*/

