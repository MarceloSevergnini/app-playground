var chatController = function ($scope, $http) {

	var net = require('net');
	var util = require('./js/modules/Util.js');

	var createClient = function(){

		var client = net.connect(3000, '127.0.0.1');
		client.on('connect', function () {
			client.write('Hello, I am the client!');
			/*
            util.hideComponent($("#chat-alert-success"));
            util.showComponent($("#connect_chat"));
            util.hideComponent($("#message_container"));
            */
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
	
	$scope.sendMessage = function () {
        var component = '<li>' + $("#message").val()+ '</li>'
        $("#teste").append(component);
    }
	
}

module.controller('chatController', chatController);
