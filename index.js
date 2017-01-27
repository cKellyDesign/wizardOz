var express = require('express');
var path = require('path');
var _ = require('underscore');
var app = express();

var connections = [];

app.use(express.static('./public'));


app.get('*', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

var server = app.listen(process.env.PORT || 3000, function() {
	console.log('Express Server running on port %s', this.address().port);
});



var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
	console.log('connection made!');

	socket.once('disconnect', function() {
		console.log('connection disconnected');
		socket.disconnect();
	})


});