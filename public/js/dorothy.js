function Dorothy () {
	var self = this;

	this.turnOnAlert = function () {
		$('body').css('background-color', 'red');
	};

	this.turnOffAlert = function () {
		$('body').css('background-color', 'white');
	};


	// initialize IO
	this.socket = io();

	// When connected, send dorthy event
	this.socket.on('connect', function() {
		self.socket.emit('dorothy');
	});

	// Listen for update to content
	this.socket.on('update', function (payload) {
		$('#container').html(payload);
	});

	this.socket.on('turn-on-alert', this.turnOnAlert);
	this.socket.on('turn-off-alert', this.turnOffAlert);
	// this.socket.on('turn-on-linig', this.turnOnLining);
	// this.socket.on('turn-off-linig', this.turnOffLining);
}

window.dorothy = new Dorothy();