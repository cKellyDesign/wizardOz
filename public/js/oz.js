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

	this.toggleAlert = function (e) {
		e.preventDefault();

		if ( $('#alertError').hasClass('off') ) {
			$('#alertError').removeClass('off').addClass('on');
			self.socket.emit('turn-on-alert');
		} else {
			$('#alertError').removeClass('on').addClass('off');
			self.socket.emit('turn-off-alert');
		}



	}

	$('#update').on('click', function (e) {
		e.preventDefault();
		self.copyMarkup();
	});

	$('#alertError').on('click', this.toggleAlert);

}

window.oz = new Oz();