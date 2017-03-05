var chatController = function ($scope, $http) {

    let net = require('net');

    let setViewCtrl = function (alert, nickname, message) {
        $scope.view = {
            alert_block : alert,
            nickname_block : nickname,
            message_block : message
        };
    };

    setViewCtrl(false, true, false);

	let createClient = function(){

        setViewCtrl(true, false, true);

		var client = net.connect(3000, '127.0.0.1');
		client.on('connect', function () {
			client.write('Hello, I am the client!');


		});
		client.on('data', function (message) {
			console.log(message.toString());
		});
		client.on('end', function () {
			process.exit();
		});
		process.stdin.on('readable', function () {
			let message = process.stdin.read();
			if (!message) return;
			message = message.toString().replace(/\n/, '');
			client.write(message);
		});

	};

	$scope.connect = function(){
		createClient();
	};
	
	$scope.sendMessage = function () {
	    if($scope.inputMessage !== null && $scope.inputMessage !== undefined && $scope.inputMessage != ""){
            $("#message_container").append('<li>' +  $scope.inputNickname  + " said: " + $scope.inputMessage + '</li>');
            $scope.inputMessage = null;
        }
    };

}


app.controller('chatController', chatController);
