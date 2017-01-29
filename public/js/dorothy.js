function Dorothy () {
	var self = this;

	// initialize IO
	this.socket = io();

	this.container = document.getElementById('container');
	this.liner = window.lining && window.lining(this.container);

	// When connected, send dorthy event
	this.socket.on('connect', function() {
		self.socket.emit('dorothy');
	});

	// Listen for update to content
	this.socket.on('update', function (payload) {
		$('#container').html(payload);
		self.liner.unlining();
		self.liner.relining();
	});
}

window.dorothy = new Dorothy();