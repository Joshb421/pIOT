console.log('Hello world')
var net = require('net');
var firmata = require('firmata');
var five = require("johnny-five");
var soc = require('socket.io');
//var RandomOrg = require('random-org');
//var random = new RandomOrg({
//    apiKey: '119ecf61-1008-4bc6-ae91-30a806ed7b09'
//});
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
            status = new five.Led(14)
            status.on()
            red = new five.Led(12)
            green = new five.Led(13)
            blue = new five.Led(15)
            randomCrossfade(30)
            red.brightness(255);
        }); //startup code here
    });
});
// Other functions in this section
var previous = [0, 0, 0]

function randomCrossfade(time) {
    console.log("Generating random number")
        //    random.generateBlobs({
        //        size: 24
        //        , n: 1
        //        , format: 'hex'
        //    }).then(function (result) {;
        //        var raw = result.random.data[0]
        //    });
    var raw = '123456'
    var RGB = []
    RGB.push(Math.floor((Math.random() * 254) + 1));
    RGB.push(Math.floor((Math.random() * 254) + 1));
    RGB.push(Math.floor((Math.random() * 254) + 1));
    var previous = current
    var current = RGB
    var change = [(previous[0] - current[0]), (previous[1] - current[1]), (previous[2] - current[2])];
    console.log(current);
    console.log(previous);
    console.log(change);
    console.log(commonMutiple);
}
var R = 0
var G = 0
var B = 0

function rgbToArray(hex) {
    RGB.push(hexToRgb(hex).r);
    RGB.push(hexToRgb(hex).g);
    RGB.push(hexToRgb(hex).b);
    return RGB;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16)
        , g: parseInt(result[2], 16)
        , b: parseInt(result[3], 16)
    } : null;
}

function setRed() {
    if (change[0] > 0) {
        change[0] = change[0] - 1
        R++
        red.brightness(R)
    }
    else if (change[0] < 0) {
        change[0] = change[0] + 1
        R--
        red.brightness(R)
    }
}
