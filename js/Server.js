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
            status = new five.Led(14)
            status.on()
            red = new five.pin.PWM(12)
            green = new five.pin.PWM(13)
            blue = new five.pin.PWM(15)
            randomCrossfade(30)
            red.write(255);
        }); //startup code here
    });
});
// Other functions in this section
var previous = [0, 0, 0]

function randomCrossfade(time) {
    console.log("calling random API")
        //    random.generateBlobs({
        //        size: 24
        //        , n: 1
        //        , format: 'hex'
        //    }).then(function (result) {;
        //        var raw = result.random.data[0]
        //    });
    var raw = '123456'
    var current = rgbToArray(raw);
    var change = [(previous[0] - current[0]), (previous[1] - current[1]), (previous[2] - current[2])];
    console.log(current);
    console.log(change);
    console.log(commonMutiple);
}
var R
var G
var B

function rgbToArray(hex) {
    var RGB = []
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
