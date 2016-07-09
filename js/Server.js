console.log('Hello world')
var net = require('net');
var firmata = require('firmata');
var five = require("johnny-five");
var soc = require('socket.io');
var RandomOrg = require('random-org');
var random = new RandomOrg({
    apiKey: '119ecf61-1008-4bc6-ae91-30a806ed7b09'
});
var options = {
    host: '192.168.1.20', // IP of ESP board
    port: 3030
};
var client = net.connect(options, function () {
    var socketClient = this;
    var esp = new firmata.Board(socketClient);
    esp.once('ready', function () {
        console.log('IO Ready');
        esp.isReady = true;
        var board = new five.Board({
            io: esp
            , repl: false
        })
        board.on("ready", function () {
            rgb = new Led.RGB([12, 13, 15])
            setInterval(function () {
                random.generateIntegers({
                    min: 1
                    , max: 255
                    , n: 3
                }).then(function (result) {
                    console.log(result.random.data); // [55, 3]
                    rgb.color(result.random.data)
                });
            }, 5000)
        });
    }); //startup code here
});
// Other functions in this section
