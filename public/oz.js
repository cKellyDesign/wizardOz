function Oz () {
	var self = this;

	// initialize IO
	this.socket = io();

	// When connected, send content to server for Dorthy
	this.socket.on('connect', function(){
		self.copyMarkup();
	});

	// Function to copy content and send to server
	this.copyMarkup = function () {
		var toSend = $('#container').html();
		self.socket.emit('content', toSend);
	}
}

window.oz = new Oz();