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
            setInterval(function () {
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
                    previous = current
                    current = RGB
                    change = [(current[0] - previous[0]), (current[1] - previous[1]), (current[2] - previous[2])];
                    console.log(previous);
                    console.log(current);
                    console.log(change);
                    var greenDelay = 5000 / Math.abs(change[1])
                    var blueDelay = 5000 / Math.abs(change[2])
                    var redDelay = 5000 / Math.abs(change[0])
                    var delay = redDelay
                    console.log(change)
                    while (change[0] != 0) {
                        console.log('Delay: ' + redDelay)
                        var test = setTimeout(setRed(), redDelay);
                        while (test = !'done') {
                            var test = setTimeout(setRed(), redDelay)
                        }
                    }
                }, 5000)
                //                    setInterval(function () {
                //                        var delay = greenDelay
                //                        setInterval(function () {
                //                            if (change[1] > 0) {
                //                                change[1] = change[1] - 1
                //                                G++
                //                                green.brightness(G)
                //                            }
                //                            else if (change[1] < 0) {
                //                                change[1] = change[1] + 1
                //                                G--
                //                                green.brightness(G)
                //                            }
                //                            //console.log(G)
                //                            // console.log(delay)
                //                        }, delay)
                //                    }, 5000);
                //                    setInterval(function () {
                //                        var delay = blueDelay
                //                        setInterval(function () {
                //                            if (change[2] > 0) {
                //                                change[2] = change[2] - 1
                //                                B++
                //                                blue.brightness(B)
                //                            }
                //                            else if (change[2] < 0) {
                //                                change[2] = change[2] + 1
                //                                B--
                //                                blue.brightness(B)
                //                            }
                //                            //console.log(delay)
                //                        }, delay)
        }, 5000)
    });
});
// Other functions in this section
var previous = [0, 0, 0]
var current = [0, 0, 0]
var change = [0, 0, 0]
    //function randomCrossfade(time) {
    //    console.log("Generating random number")
    //        //    random.generateBlobs({
    //        //        size: 24
    //        //        , n: 1
    //        //        , format: 'hex'
    //        //    }).then(function (result) {;
    //        //        var raw = result.random.data[0]
    //        //    });
    //    var raw = '123456'
    //    var RGB = []
    //    RGB.push(Math.floor((Math.random() * 254) + 1));
    //    RGB.push(Math.floor((Math.random() * 254) + 1));
    //    RGB.push(Math.floor((Math.random() * 254) + 1));
    //    previous = current
    //    current = RGB
    //    var change = [(current[0] - previous[0]), (current[1] - previous[1]), (current[2] - previous[2])];
    //    console.log(previous);
    //    console.log(current);
    //    console.log(change);
    //    return
    //}
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
    return ('not done')
    console.log("test")
    if (change[0] > 0) {
        change[0] = change[0] - 1
        R++
        red.brightness(R)
        console.log(R)
        console.log('Change remaining' + Math.abs(change[0]))
        return
    }
    else if (change[0] < 0) {
        change[0] = change[0] + 1
        R--
        red.brightness(R)
        console.log(R)
        console.log('Change remaining' + Math.abs(change[0]))
        return
    }
    else {
        return ('done')
    }
    return ('done')
}
