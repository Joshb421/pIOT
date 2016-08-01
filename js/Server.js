console.log('Hello world');
var net = require('net');
var firmata = require('firmata');
var five = require("johnny-five");
var soc = require('socket.io');
var sleep = require('sleep');
var delayed = require('delayed');
var tinycolor = require("tinycolor2");
var fs = require('fs');
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
app.listen(80);

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
            , repl: true
        });
        board.on("ready", function () {
            status = new five.Led(14);
            status.on();
            rgb = new five.Led.RGB([12, 13, 15])
                var RGB = [];
            var hue = 0;
            RGBStrip(1, true, 30, null)

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
function RGBStrip(mode, time, hex, brightness) {
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
    setInterval(function () {
        console.log(hue);
        hue = hue + 0.23529411764;
        var hsl = tinycolor({h: hue, s: 100, v: 100});
        // R = hsl.toRgb().r;
        // G = hsl.toRgb().g;
        // B = hsl.toRgb().b;
        // console.log(R, G, B);
        console.log(hsl.toHex());
        rgb.color(hsl.toHex());
        if (hue >= 360) {
            hue = 0
        }
    }, 5000 / 1530);
}

function wakeUp(days, time) {
    set
    timeout
}