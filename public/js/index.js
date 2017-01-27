function Dorthy () {
	var self = this;

	// initialize IO
	this.socket = io();

	// When connected, send dorthy event
	this.socket.on('connect', function() {
		self.socket.emit('dorthy');
	});

	// Listen for update to content
	this.socket.on('update', function (payload) {
		$('#container').html(payload);
	});
}

window.dorthy = new Dorthy();