'use strict';

angular.module('loginService', [])
	.factory('loginService', ['previewLoginCredentials', function(previewLoginCredentials){
		var LoggedIn = false;

		var isLoggedIn = function(){
			return LoggedIn;
		};

		var authenticate = function (username, password) {
        	//Since we don't really have a backend in place at this point, I'll just hardcode the shit out of this
             LoggedIn = (username === previewLoginCredentials.username && password === previewLoginCredentials.password);
             console.log('auth function: ' + LoggedIn);
             return LoggedIn;
        };

        return {
        	authenticate : authenticate,
        	isLoggedIn: isLoggedIn
        };
	}]);

