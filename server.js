var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    messages = [],
    sockets = [];

app.use( express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000));

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
io.sockets.on('connection', function (socket) {

    sockets.push(socket);

    socket.emit('messages-available', messages);

    socket.on('add-message', function (data) {
        messages.push(data);
        sockets.forEach(function (socket) {
            socket.emit('message-added', data);
        });
    });
});
