var robot = require("robotjs");
var Promise = require("bluebird");

Promise.delay(500)
.then(function(){
    return robot.keyTap('t', 'command')
})
.delay(3000)
.then(function(){
    return robot.keyTap('enter');
})
.delay(3000)
.then(function(){
    return robot.typeString('http://learn.fullstackacademy.com');
})
.delay(3000)
.then(function(){ 
    // console.log('Hello');
    return robot.keyTap('enter');
})
.delay(5000)
.then(function(){
    return robot.keyTap('tab');
})
.delay(5000)
.then(function(){
    return robot.keyTap('tab');
})
.delay(2000)
.then(function(){
    // return robot.typeString(require('../secret/secret.json').username);
    return robot.typeString('tenloh@gmail.com');
})
.delay(2000)
.then(function(){
    return robot.keyTap('tab')
})
.delay(2000)
.then(function(){
    return robot.typeString(require('../secret/secret.json').password)
})
.delay(2000)
.then(function(){
    return robot.keyTap('enter')
})