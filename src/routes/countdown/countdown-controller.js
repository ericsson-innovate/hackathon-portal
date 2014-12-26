angular.module('countdownController', [])

.controller('CountdownCtrl', [
    '$scope',
    'developerPreview',
    '$state',
    function($scope, developerPreview, $state) {


	    var currentTime = (new Date()).getTime();
	    var startTime = (new Date(developerPreview.startDate)).getTime();
	    var endTime = (new Date(developerPreview.endDate)).getTime();

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
	        $scope.$apply(function(){
		    	$scope.preview.before = false;
    			$scope.preview.during = true;
        	});
    	};

    	$scope.goToPortal = function(){
    		window.location.replace('/');
    	};

        $scope.end = (new Date(developerPreview.startDate)).getTime();
    }
]);