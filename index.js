var express = require('express');
var path = require('path');
var _ = require('underscore');
var app = express();

// what is sent to Dorthy and is updated by Oz
var content = '<h1>Waiting for Oz</h1>';

// Static Express Server Settings
app.use(express.static('./public'));
app.get('*', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// start up the server on port 3000
var server = app.listen(process.env.PORT || 3000, function() {
	console.log('Express Server running on port %s', this.address().port);
});


// Init IO
var io = require('socket.io').listen(server);

// Listen for connection before assigning listeners
io.sockets.on('connection', function (socket) {

	// Listen for disconnection from either Oz or Dorthy
	socket.once('disconnect', function() {
		console.log('connection disconnected');
		socket.disconnect();
	})

	// Listen for new conent from OZ
	socket.on('content', function (payload) {
		content = payload;
		io.sockets.emit('update', content);
	});

	// Listen for Dorothy to send her content
	socket.on('dorothy', function () {
		io.sockets.emit('update', content);
	})
});