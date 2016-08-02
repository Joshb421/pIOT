console.log('Hello world');
var net = require('net');
var firmata = require('firmata');
var five = require("johnny-five");
var soc = require('socket.io');
var sleep = require('sleep');
var delayed = require('delayed');
var tinycolor = require("tinycolor2");
var fs = require('fs');
var app = require('http').createServer(handler);
var io = require('socket.io')(app);
app.listen(8080);
var d = new Date();
function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

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
            rgb = new five.Led.RGB([12, 13, 15]);
            wakeUp([true, true, true, true, true, true, true], 18, 50)
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
});

// app.post('/crossfade', function (req, res) {
//     var response = req.body;
//     console.log('Request received at:', +response.sent);
//     console.log('Request state:', +response.state);
//
//
//     led.color(response.color);
//     res.send('LED request successful!');
// });
var running = false;
var RGB = [0, 0, 0];
var hue = 0;


function RGBStrip(mode, time, hex, brightness) {
    rgb.intensity(brightness);
    if (mode == 0) {
        rgb.off()
    }
    while (mode == 1) {
        runnning = true;
        setInterval(function () {
            console.log(hue);
            hue = hue + 0.23529411764;
            var hsl = tinycolor({h: hue, s: 100, v: 100});
            console.log(hsl.toHex());
            hex = hsl.toHex();
            rgb.color(hex);
            if (hue >= 360) {
                hue = 0
            }
        }, time / 1530000);

    }
    if (mode == 2) {
        rgb.color(hex)
    }
}

function wakeUp(days, hour, minute) {
    var target = hour * 3600000 + minute * 60000;
    var enableTime = d.getHours() * 3600000 + d.getMinutes() * 60000;
    var initialDelay = 0;
    if (enableTime > target) {
        console.log(enableTime)
        initialDelay = enableTime - target
        console.log(initialDelay)
    }
    else if (enableTime < target) {
        intialDelay = 86400000 + enableTime - target
    }
    setTimeout(function () {
        if (days [d.getDay()] == true) {
            setInterval(function () {
                RGB[0]++;
                RGB[1]++;
                console.log(RGB);
                RGBStrip(2, null, RGB, 100);
                if (RGB[0] > 254) {
                    clearInterval()
                }
            }, 400);

        }
    }, initialDelay);
    setInterval(function () {
        running = true;
        if (days [d.getDay()] == true) {
            setInterval(function () {
                RGB[0]++;
                RGB[1]++;
                console.log(RGB);
                RGBStrip(2, null, RGB, 100);
                if (RGB[0] > 254) {
                    clearInterval()
                }
            }, 400);
            setTimeout(function () {
                RGB = [0, 0, 0];
                RGBStrip(2, null, RGB, 100);

            })

        }

    }, 86400000)
}