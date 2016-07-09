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
                            setInterval(function () {
                                    console.log("calling random API")
                                    random.generateBlobs({
                                        size: 24
                                        , n: 1
                                        , format: string
                                    }).then(function (result) {
                                            console.log(result.random.data); // [55, 3]
                                            rgb.color(result.random.data)
                                            console.log(bintohex(result.random.data)
                                            });
                                    }, 5000)
                            });
                    }); //startup code here
            });
        // Other functions in this section
        function bintohex(mybin) {
            mybin = document.getElementById('bin').value;
            z = -1;
            number = 0;
            for (i = mybin.length; i > -1; i--) {
                //Every 1 in binary string is converted to decimal and added to number
                if (mybin.charAt(i) == "1") {
                    number += Math.pow(2, z);
                }
                z += 1;
            }
            // Return is converting decimal to hexadecimal
            mybin = number.toString(16);
            return mybin
        }
