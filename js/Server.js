console.log('Hello world')
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
