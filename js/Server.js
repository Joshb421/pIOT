var net = require('net');
var firmata = require('firmata');
var five = require("johnny-five");
var io = require('socket.io')(70);
console.log('Hello world')
var options = {
    host: '192.168.1.20', // IP of ESP board
    port: 3030
};
var client = net.connect(options, function () {
    var socketClient = this;
    var esp = new firmata.Board(socketClient);
    io.esp('ready', function () {
        console.log('IO Ready');
        esp.isReady = true;
        var board = new five.Board({
            io: esp
            , repl: false
        })
        board.on("ready", function () {
            //startup code here
            socket.emit('test', )
        });
        // Other functions in this section
    })
})
