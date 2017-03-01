
const TABS = {
	"home" : "home",
	"chat" : "chat",
	"threejs" : "threejs"
}

var tabController = function ($scope) {

	$scope.tabs = {
		"home" : true,
		"chat" : false,
		"threejs" : false
	}

	$scope.controll = function(tab){

		switch(tab) {
		    case TABS.home:
		        $scope.tabs = {
					"home" : true,
					"chat" : false,
					"threejs" : false
				}
		        break;
		    case TABS.chat:
		        $scope.tabs = {
					"home" : false,
					"chat" : true,
					"threejs" : false
				}
		        break;
		     case TABS.threejs:
		        $scope.tabs = {
					"home" : false,
					"chat" : false,
					"threejs" : true
				}
		        break;
		    default:
		        $scope.tabs = {
					"home" : true,
					"chat" : false,
					"threejs" : false
				}
		}
	}
	
}

module.controller('tabController', tabController);
