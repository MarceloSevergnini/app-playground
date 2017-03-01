var chatController = function ($scope, $http) {

	var net = require('net');

	var createClient = function(){

		var client = net.connect(3000, '127.0.0.1');
		client.on('connect', function () {
			client.write('Hello, I am the client!');
			$("#chat-alert-success").removeClass("hide--all");
			$("#connect_chat").addClass("hide--all");
			
		});
		client.on('data', function (message) {
			console.log(message.toString());
		});
		client.on('end', function () {
			process.exit();
		});
		process.stdin.on('readable', function () {
			var message = process.stdin.read();
			if (!message) return;
			message = message.toString().replace(/\n/, '');
			client.write(message);
		});

	}


	$scope.connect = function(){
		createClient();
	}
	
}

module.controller('chatController', chatController);
