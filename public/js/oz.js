function Oz () {
	var self = this;
	CKEDITOR.replace('editor');

	// initialize IO
	this.socket = io();

	// When connected, send content to server for Dorthy
	this.socket.on('connect', function(){
		self.copyMarkup();
	});

	// Function to copy content and send to server
	this.copyMarkup = function () {
		var data = CKEDITOR.instances.editor.getData();
		console.log(data);
		$('#container').html(data);
		self.socket.emit('content', data);
	}

	$('#update').on('click', function (e) {
		e.preventDefault();
		self.copyMarkup();
	});

}

window.oz = new Oz();