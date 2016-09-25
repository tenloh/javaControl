var robot = require("robotjs");
var Promise = require("bluebird");

var typeString = Promise.method(function (dir) {
    robot.typeString(dir);
})

// var pTypeString = new Promise(function(resolve, reject){
//     resolve(robot.typeString())
// })

var keyTap = Promise.method(function (dir) {
    robot.keyTap(dir);
})

var moveMouse = Promise.method(function (x, y) {
    robot.moveMouse(x, y);
})
var mouseClick = Promise.method(function (direction, dbl) {
    robot.mouseClick(direction, dbl);
})


var sleep = (function () {
    var first = true;
    function show_sleep_msg() {
        if (first) {
            first = false;
            ["You see,",
                "this is a busy-wait sleep() which freezes the console.",
                "JavaScript won't sleep without Hypnotic!"].forEach(function (msg) {
                    console.log(msg);
                });
        }
    }
    return function (ms) {
        var stop = Date.now() + ms;
        /* waste some time through busy-wait */
        while (Date.now() < stop) { }
        if (ms >= 500) show_sleep_msg();
    }
})();


robot.setKeyboardDelay(10000);

//Open Learn Dot and Sign In
robot.typeString('/usr/bin/open -a "/Applications/Google Chrome.app" \'http://learn.fullstackacademy.com/\'');

// // // //Move to Login Button
// // // robot.setKeyboardDelay(10000) //10 second delay for keypress
// // // robot.setMouseDelay(10000); // 10 second delay for mouse action

robot.keyTap('enter');

sleep(10000);
robot.typeString('node server/moveMouse.js');
robot.keyTap('enter');
// robot.typeStringDelayed('tenloh@gmail.com', 50);
// robot.keyTap('tab');
// robot.typeString(require('../secret/secret.js').password);
// robot.keyTap('enter');


// //Promise.delay(1000)
// typeString('/usr/bin/open -a "/Applications/Google Chrome.app" \'http://learn.fullstackacademy.com/\'')
//     .then(() => Promise.delay(10000))
//     .then(robot.keyTap('enter'))
//     .then(() => Promise.delay(20000))
//     .then(robot.keyTap('tab'))
//     .then(() => Promise.delay(20000))
//     .then(robot.keyTap('tab'))
//     .catch((err) => console.error(err));


