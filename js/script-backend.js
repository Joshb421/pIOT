var net = require('net');
var firmata = require('firmata');
var five = require("johnny-five");

console.log('Hello world')
var options = {
  host: '192.168.1.20',  // IP of ESP board
  port: 3030
};



var client = net.connect(options, function() {

  var socketClient = this;

  var io = new firmata.Board(socketClient);
  io.once('ready', function(){
      console.log('IO Ready');
      io.isReady = true;
