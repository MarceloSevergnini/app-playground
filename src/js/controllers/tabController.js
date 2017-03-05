
var tabController = function ($scope) {

    $scope.setTabCtrl = function (home, chat, three) {
    	$scope.tabs = {
            home : home,
            chat : chat,
            three : three
        };
    };

    $scope.setTabCtrl(false, true, false);

}

app.controller('tabController', tabController);
