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
			$('#alertError').removeClass('off').addClass('on').text('Error ON');
			self.socket.emit('turn-on-alert');
		} else {
			$('#alertError').removeClass('on').addClass('off').text('Error OFF');
			self.socket.emit('turn-off-alert');
		}
	};

	this.toggleLining = function (e) {
		e.preventDefault();

		if ( $('#lining').hasClass('off') ) {
			$('#lining').removeClass('off').addClass('on').text('Lining ON');
			self.socket.emit('turn-on-lining');
		} else {
			$('#lining').removeClass('on').addClass('off').text('Lining OFF');
			self.socket.emit('turn-off-lining');
		}
	};

	$('#update').on('click', function (e) {
		e.preventDefault();
		self.copyMarkup();
	});

	$('#alertError').on('click', this.toggleAlert);
	$('#lining').on('click', this.toggleLining);

}

window.oz = new Oz();