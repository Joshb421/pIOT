console.log('Hello world');
var net = require('net');
var firmata = require('firmata');
var five = require("johnny-five");
var soc = require('socket.io');
var sleep = require('sleep');
var delayed = require('delayed');
var fs = require('fs');
//var RandomOrg = require('random-org');
//var random = new RandomOrg({
//    apiKey: '119ecf61-1008-4bc6-ae91-30a806ed7b09'
//});
var options = {
    host: '192.168.1.169', // IP of ESP board
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
        });
        board.on("ready", function () {
            status = new five.Led(14);
            status.on();
            red = new five.Led(12);
            green = new five.Led(13);
            blue = new five.Led(15);
                console.log("Generating random number");
                //    random.generateBlobs({
                //        size: 24
                //        , n: 1
                //        , format: 'hex'
                //    }).then(function (result) {;
                //        var raw = result.random.data[0]
                //    });
                var RGB = [];
                RGB.push(Math.floor((Math.random() * 254) + 1));
                RGB.push(Math.floor((Math.random() * 254) + 1));
                RGB.push(Math.floor((Math.random() * 254) + 1));
                previous = current;
                current = RGB;
                c = [(current[0] - previous[0]), (current[1] - previous[1]), (current[2] - previous[2])];
                console.log(previous);
                console.log(current);
            var hue = 0;
            setInterval(function () {
                hue++;
                hsvToArray(hue);
                console.log(RGB);
                red.brightness(RGB[0]);
                green.brightness(RGB[1]);
                blue.brightness(RGB[2]);
                if (hue > 359) {
                    hue = 0
                }
            }, 5000 / 360);
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
        });
    });
}); // Other functions in this section
var previous = [0, 0, 0];
var current = [0, 0, 0];
var  changee = [0, 0, 0];
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
var R = 0;
var G = 0;
var B = 0;
var RGB = [];
function hsvToArray(hsv) {
    RGB = [];
    RGB.push(HSVtoRGB(hsv, 1, 1).r);
    RGB.push(HSVtoRGB(hsv, 1, 1).g);
    RGB.push(HSVtoRGB(hsv, 1, 1).b);
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
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

// app.post('/crossfade', function (req, res) {
//     var response = req.body;
//     console.log('Request received at:', +response.sent);
//     console.log('Request state:', +response.state);
//
//
//     led.color(response.color);
//     res.send('LED request successful!');
// });


