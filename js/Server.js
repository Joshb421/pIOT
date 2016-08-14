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
var shell = require('shelljs/global');



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
    host: '192.168.1.170', // IP of ESP board
    port: 3030
};
var client = net.connect(options, function () {
    var socketClient = this;
    var esp = new firmata.Board(socketClient);
    esp.once('ready', function () {
        console.log('ESP Connected');
        esp.isReady = true;
        var board = new five.Board({
            io: esp
            , repl: false
        });
        board.on("ready", function () {
            console.log("ESP ready");
            status = new five.Led(14);
            status.on();
            rgb = new five.Led.RGB([12, 13, 15]);
            console.log("RGB LED initialized");
            RGBStrip(1, 30000, null, 100);
            //wakeUp([true, true, true, true, true, true, true], 20, d.getMinutes() + 1);
            //    //                    setInterval(function () {
            //    //                        var delay = greenDelay
            //    //                        setInterval(function () {
            //    //                            if (change[1] > 0) {
            //    //                                change[1] = change[1] - 1
            //    //                                G++
            //    //                                green.brightness(G)
            //    //                            }
            //    //                            else if (change[1] < 0) {
            //    //                                change[1] = change[1] + 1
            //    //                                G--
            //    //                                green.brightness(G)
            //    //                            }
            //    //                            //console.log(G)
            //    //                            // console.log(delay)
            //    //                        }, delay)
            //    //                    }, 5000);
            //    //                    setInterval(function () {
            //    //                        var delay = blueDelay
            //    //                        setInterval(function () {
            //    //                            if (change[2] > 0) {
            //    //                                change[2] = change[2] - 1
            //    //                                B++
            //    //                                blue.brightness(B)
            //    //                            }
            //    //                            else if (change[2] < 0) {
            //    //                                change[2] = change[2] + 1
            //    //                                B--
            //    //                                blue.brightness(B)
            //    //                            }
            //    //                            //console.log(delay)
            //    //                        }, delay)
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
    console.log("function called");
    if (mode == 0) {
        rgb.off()
    }
    if (mode == 1) {
        RGB = [255, 0, 0];
        for (RGB[1]; RGB[1] < 256; RGB[1]++) {
            setTimeout(function () {
                console.log(RGB);
            }, time / 6 / 255);

        }
        for (i = RGB[0]; i > 0; i--) {
            setTimeout(function () {
                console.log(RGB);
                RGB [0] = i
            }, time / 6 / 255);

        }
        for (i = RGB[2]; i < 256; i++) {
            setTimeout(function () {
                console.log(RGB);
                RGB [2] = i
            }, time / 6 / 255);

        }
        for (i = RGB[1]; i > 0; i--) {
            setTimeout(function () {
                console.log(RGB);
                RGB [1] = i
            }, time / 6 / 255);

        }
        for (i = RGB[0]; i < 256; i++) {
            setTimeout(function () {
                console.log(RGB);
                RGB [0] = i
            }, time / 6 / 255);

        }
        for (i = RGB[2]; i > 0; i--) {
            setTimeout(function () {
                console.log(RGB);
                RGB [2] = i
            }, time / 6 / 255);

        }
    }

    //runnning = true;
    //setInterval(function () {
    //    console.log(hue);
    //
    //    hue = hue + 0.23529411764;
    //    var hsl = tinycolor({h: hue, s: 100, v: 100});
    //    console.log(hsl.toHex());
    //    hex = hsl.toHex();
    //    rgb.color(hex);
    //    if (hue > 360) {
    //        hue = 0
    //    }
    //}, time / 1530000);


    if (mode == 2) {
        rgb.color(hex)
    }
}

var delay;
function wakeUp(days, hour, minute) {
    var target = (hour * 3600000 ) + (minute * 60000);
    var enableTime = (d.getHours() * 3600000) + (d.getMinutes() * 60000);
    console.log('Target time ' + hour + ':' + minute);
    console.log('Activation time ' + d.getHours() + ':' + d.getMinutes());


    if (enableTime > target) {
        console.log(target);
        console.log(enableTime);
        delay = target - enableTime + 86400000;
        console.log(delay);
    }
    else if (enableTime < target) {
        console.log(target);
        console.log(enableTime);
        delay = target - enableTime;
        console.log(delay);

    }
    setTimeout(function () {
        console.log('activated');
        if (true == true) {
            while (RGB[1] > 254) {
                setInterval(function () {
                    RGB[0]++;
                    RGB[1]++;
                    console.log(RGB);
                    RGBStrip(2, null, RGB, 100);
                }, 4000);
                setTimeout(function () {
                    RGB = [0, 0, 0];
                    console.log(RGB);
                    RGBStrip(2, null, RGB, 100);
                }, 120000)
            }
        }
    }, delay);
}

function piPower() {
    console.log('Raspberry pi rebooting');
    {
        document.body.style.backgroundColor = '#C10C05';
        document.write("<h1>Reboot Imminent</h1><br>")
    }
}