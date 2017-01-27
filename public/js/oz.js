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


	CKEDITOR.replace('editor');


	$('#update').on('click', function (e) {
		e.preventDefault();
		self.copyMarkup();
	});

}

window.oz = new Oz();