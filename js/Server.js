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
            rgb = new five.Led.RGB([12, 13, 15])
            setInterval(randomCrossfade(), 5000);
        }); //startup code here
    });
});
// Other functions in this section
function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16)
        , g: parseInt(result[2], 16)
        , b: parseInt(result[3], 16)
    } : null;
}
var previous = [0, 0, 0]

function randomCrossfade(time) {
    console.log("calling random API")
    RGB = rgbToArray('123456')
    var current = RGB
    console.log(RGB)
    random.generateBlobs({
        size: 24
        , n: 1
        , format: 'hex'
    }).then(function (result) {;
        console.log(result.random.data);
        console.log(hex)
        rgb.color(hex)
    });
}

function rgbToArray(hex) {
    RGB.push(hexToRgb(hex).r)
    RGB.push(hexToRgb(hex).g)
    RGB.push(hexToRgb(hex).b)
}
