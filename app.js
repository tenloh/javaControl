const express = require('express');
const app = express();
const path = require('path');
const exec = require('child_process').exec;
const Promise = require('bluebird');
const cookieParser = require('cookie-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const robot = require('robotjs');

// var socketio = require("socket.io");
// var server = app.listen(3000, function() {
// 	console.log("Server is live @ Port 3000");
// });

// var io = socketio.listen(server);
http.listen(3000, function () {
    console.log('listening on *:3000');
});

let state;
let handlerDown;
let handlerUp;
let handlerRight;
let handlerLeft;
let handlerClear;
let handlerPressDown;
let handlerPressUp;
let handlerEnter;
let handlerDelete;
let handlerCmd;
io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('disconnect', function (msg) {
        console.log('a user has disconnected');
    })

    socket.on('type', function (msg) {
        console.log('message: ' + msg);
        if (msg.toLowerCase() === 'logintolearndot') {
            exec('node server/thirdVersion.js');
        } else {
            robot.typeString(msg);
        }
    });

    socket.on('keypress', function(keyCode){
        let char;
        char = String.fromCharCode(keyCode).toLowerCase();
        console.log('char', char);
        robot.keyTap(char);
    })

    socket.on('move mouse down', function (data) {
        if (data === 'clear') {
            console.log('clearing down interval')
            state = '';
            handlerDown = clearInterval(handlerDown);
            console.log('after interval clear', handlerDown);
        } else if (!handlerDown) {
            console.log('setting down interval');
            state = data;
            handlerDown = setInterval(function () {
                let mouse = robot.getMousePos();
                robot.moveMouse(mouse.x, mouse.y + 5);
            }, 1);
        }
    })
    socket.on('move mouse up', function (data) {
        if (data === 'clear') {
            console.log('clearing up interval')
            state = ''
            handlerUp = clearInterval(handlerUp);
        } else if (!handlerUp) {
            console.log('setting up interval');
            state = data;
            handlerUp = setInterval(function () {
                let mouse = robot.getMousePos();
                robot.moveMouse(mouse.x, mouse.y - 5);
            }, 1);
        }
    })
    socket.on('move mouse left', function (data) {
        if (data === 'clear') {
            console.log('clearing left interval')
            state = ''
            handlerRight = clearInterval(handlerRight);
        } else if (!handlerRight) {
            console.log('setting left interval');
            state = data;
            handlerRight = setInterval(function () {
                let mouse = robot.getMousePos();
                robot.moveMouse(mouse.x - 5, mouse.y);
            }, 1);
        }
    })

    socket.on('move mouse right', function (data) {
        if (data === 'clear') {
            console.log('clearing right interval')
            state = ''
            handlerLeft = clearInterval(handlerLeft);
        } else if (!handlerLeft) {
            console.log('setting right interval');
            state = data;
            handlerLeft = setInterval(function () {
                let mouse = robot.getMousePos();
                robot.moveMouse(mouse.x + 5, mouse.y);
            }, 1);
        }
    })

    socket.on('clickmouse', function (data) {
        if (data === 'clear') {
            console.log('clear click interval')
            state = ''
            handlerClear = clearInterval(handlerClear);
        } else if (!handlerClear) {
            console.log('setting click interval');
            state = data;
            handlerClear = setInterval(function () {
                robot.mouseClick('left', false);
            }, 500);
        }

    })

    socket.on('pressdown', function (data) {
        if (data === 'clear') {
            console.log('clear click interval')
            state = ''
            handlerPressDown = clearInterval(handlerPressDown);
        } else if (!handlerPressDown) {
            console.log('setting click interval');
            state = data;
            handlerPressDown = setInterval(function () {
                robot.mouseToggle('down', 'left');
            }, 275);
        }

    })

    socket.on('pressup', function (data) {
        if (data === 'clear') {
            console.log('clear click interval')
            state = ''
            handlerPressUp = clearInterval(handlerPressUp);
        } else if (!handlerPressUp) {
            console.log('setting click interval');
            state = data;
            handlerPressUp = setInterval(function () {
                robot.mouseToggle('up', 'left');
            }, 275);
        }

    })

    socket.on('enter', function (data) {
        if (data === 'clear') {
            console.log('clear click interval')
            state = ''
            handlerEnter = clearInterval(handlerEnter);
        } else if (!handlerEnter) {
            console.log('setting click interval');
            state = data;
            handlerEnter = setInterval(function () {
                robot.keyTap('enter');
            }, 275);
        }

    })

    socket.on('delete', function (data) {
        if (data === 'clear') {
            console.log('clear click interval')
            state = ''
            handlerDelete = clearInterval(handlerDelete);
        } else if (!handlerDelete) {
            console.log('setting click interval');
            state = data;
            handlerDelete = setInterval(function () {
                robot.keyTap('backspace');
            }, 275);
        }

    })


    socket.on('cmd', function (data) {
        if (data === 'clear') {
            console.log('clear click interval')
            state = ''
            handlerCmd = clearInterval(handlerCmd);
        } else if (!handlerCmd) {
            console.log('setting click interval');
            state = data;
            handlerCmd = setInterval(function () {
                robot.keyToggle('command');
            }, 275);
        }

    })
});



let promisifiedExec = Promise.promisify(exec);

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/browser')).use(cookieParser());

app.post('/logTenIn', function (req, res, next) {
    promisifiedExec('node server/thirdVersion.js')
        .then(function (success) {
            res.sendStatus(204);
        }).catch(next);
})

app.get('/*', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/server/index.html'));
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(4000, function () {
    console.log('You\'re live on Port 4000!');
});