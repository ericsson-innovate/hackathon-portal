angular.module('countdownController', [])

.controller('CountdownCtrl', [
    '$scope',
    '$timeout',
    '$state',
    'loginService',
    'developerPreview',
    function($scope, $timeout, $state, loginService, developerPreview) {
        

	    var currentTime = (new Date()).getTime();
	    var startTime = (new Date(developerPreview.startDate)).getTime();
	    var endTime = (new Date(developerPreview.endDate)).getTime();

        $scope.showError = false;
        $scope.showLogin = false;

	    $scope.preview = {
	    	before: false,
	    	during: false,
	    	after: false
	    };

	    if(currentTime < startTime) $scope.preview.before = true;
	    else if(currentTime >= startTime  && currentTime <= endTime) $scope.preview.during = true;
	    else if(currentTime > endTime) $scope.preview.after = true;



    	$scope.countdownEnded = function(){
    		console.log('redirect');
	        $timeout(function(){
                $scope.$apply(function(){
                    $scope.preview.before = false;
                    $scope.preview.during = true;
                });
            });
    	};

    	$scope.goToPortal = function(){
    		$state.go('two-videos');
    	};

        $scope.end = (new Date(developerPreview.startDate)).getTime();

        $scope.login = function(){
            if (loginService.authenticate($scope.username , $scope.password)) {
                console.log('Authenticated');
                $scope.goToPortal();
            }
            else{
                console.log('Invalid credentials');
                $scope.showError = true;
            };
        }
    }
]);