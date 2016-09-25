$(document).ready(function () {
    var socket = io.connect('http://192.168.4.239:3000');
    // var socket = io.connect('http://localhost:3000');
    // var socket = io.connect('http://192.168.1.16:3000');

    // $('form').submit(function () {
    //     console.log($('#m').val())
    //     socket.emit('type', $('#m').val());
    //     $('#m').val('');
    //     return false;
    // });

    $('#m').bind('keypress', function(event){
        // socket.emit('keypress', $('#m').val());
        socket.emit('keypress', event.keyCode);
        $('#m').val('');
    })


    $('#down').bind('vmousedown vmouseover', function () {
        console.log('Press Down');
        socket.emit('move mouse down', 'mousedown');
    }).bind('vmouseout vmouseup', function () {
        console.log('Release Down');
        socket.emit('move mouse down', 'clear');
    })

    $('#up').bind('vmousedown vmouseover', function () {
        console.log('Up');
        socket.emit('move mouse up', 'mouseup');
    }).bind('vmouseout vmouseup', function () {
        console.log('Release Down');
        socket.emit('move mouse up', 'clear');
    })

    $('#left').bind('vmousedown vmouseover', function () {
        console.log('Left');
        socket.emit('move mouse left', 'mouseleft');
    }).bind('vmouseout vmouseup', function () {
        console.log('Release Down');
        socket.emit('move mouse left', 'clear');
    })

    $('#right').bind('vmousedown vmouseover', function () {
        console.log('Right');
        socket.emit('move mouse right', 'mouseright');
    }).bind('vmouseout vmouseup', function () {
        console.log('Release Down');
        socket.emit('move mouse right', 'clear');
    })

    $('#pDown').bind('vmousedown vmouseover vclick', function () {
        console.log('pDown');
        socket.emit('pressdown', 'pressdown');
    }).bind('vmouseout vmouseup', function () {
        console.log('Release pDown');
        socket.emit('pressdown', 'clear');
    })

    $('#pUp').bind('vmousedown vmouseover vclick', function () {
        console.log('pUp');
        socket.emit('pressup', 'pressup');
    }).bind('vmouseout vmouseup', function () {
        console.log('Release pUp');
        socket.emit('pressup', 'clear');
    })

    $('#click').bind('vmousedown vmouseover vclick', function () {
        console.log('Click');
        socket.emit('clickmouse', 'clickmouse');
    }).bind('vmouseout vmouseup', function () {
        console.log('Release Click');
        socket.emit('clickmouse', 'clear');
    })

    $('#enter').bind('vmousedown vmouseover vclick', function () {
        console.log('Click');
        socket.emit('enter', 'enter');
    }).bind('vmouseout vmouseup', function () {
        console.log('Release Click');
        socket.emit('enter', 'clear');
    })

    $('#delete').bind('vmousedown vmouseover vclick', function () {
        console.log('Click');
        socket.emit('delete', 'delete');
    }).bind('vmouseout vmouseup', function () {
        console.log('Release Click');
        socket.emit('delete', 'clear');
    })


    $('#cmd').bind('vmousedown vmouseover vmouseclick', function () {
        console.log('Click');
        socket.emit('cmd', 'cmd');
    }).bind('vmouseout vmouseup', function () {
        console.log('Release Click');
        socket.emit('cmd', 'clear');
    })
})