var five = require("johnny-five");
var Raspi = require("raspi-io");
var pi = new five.Board({
    io: new Raspi()
});
board.on("ready", function () {
    var lcd = new five.LCD({
        controller: "PCF8574A"
    })
    var rgb = new five.Led.RGB({
        pins: [21, 20, 16]
        isAnode: true
    })
    lcd.print("Hello world.")
});

function wakeup() {}
"use strict";
var fadePro = 0
var daysActive = [""]

function wakeupDays(day) {
    daysActive.push(day)
    console.log(daysActive)
}

function writergb(hex) {
    rgb.color(hex)
}

function updatergb(mode) { //Mode 1 picker,Mode 2 Crossfade
    var brightness = document.getElementById("brightness").value;
    var delay = document.getElementById("time").value * 1000 / 360
    rgb.intensity(brightness);
    if (mode === 1) {
        var hex = document.getElementById("colorpicker").value;
        writergb(hex);
    }
    while (mode === 2) {
        while (crossfade() = !true) {}
        setTimeout(crossfade(), delay)
    }
}
js

function crossfade() {
    if (fadePro > 360) {
        return true //should be a callback
    }
    else {
        fadePro++;
        hex = //hsl to rgb function TBD
            writergb(hex)
        console.log("fadePro")
        return false
    }
}
// function setrgb() {
//     //led.intensity(brightness)
//     if (crossfadeTrue === true) {
//         var delay = document.getElementById("time").value * 1000 / 360;
//         var isRunning = false;
//         console.log(delay);
//         if (crossfadeTrue === true) {
//             (function theLoop(i) {
//                 setTimeout(function () {
//                     console.log(i);
//                     console.log(isRunning);
//                     if (--i) { // If i > 0, keep going
//                         theLoop(i);
//                         isRunning = true; // Call the loop again, and pass it the current value of i
//                     }
//                     if (i === 0) {
//                         isRunning = false;
//                     }
//                 }, delay);
//             })(360);
//         }
//         else {}
//     }
// }
