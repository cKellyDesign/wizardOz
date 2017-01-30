function Dorothy () {
	var self = this;

	this.doLining = true;

	this.turnOnAlert = function () {
		$('#alertBox').addClass('active')
	};

	this.turnOffAlert = function () {
		$('#alertBox').removeClass('active')
	};

	this.turnOnLining = function () {
		self.doLining = true;
		self.liner.unlining();
		self.liner.relining();
	};

	this.turnOffLining = function () {
		self.doLining = false;
		self.liner.unlining();
	};

	this.updateContainer = function (payload) {
		$('#container').html(payload);

		if (self.doLining) {
			self.liner.unlining();
			self.liner.relining();
		}
	}


	// initialize IO
	this.socket = io();

	this.container = document.getElementById('container');
	this.liner = window.lining && window.lining(this.container);

	// When connected, send dorthy event
	this.socket.on('connect', function() {
		self.socket.emit('dorothy');
	});

	// Listen for update to content
	this.socket.on('update', this.updateContainer);
	this.socket.on('turn-on-alert', this.turnOnAlert);
	this.socket.on('turn-off-alert', this.turnOffAlert);
	this.socket.on('turn-on-lining', this.turnOnLining);
	this.socket.on('turn-off-lining', this.turnOffLining);
}

window.dorothy = new Dorothy();