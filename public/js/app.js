var app = angular.module('TumTumApp', ['ngRoute']);
var User = require('../models/userModel.js')



app.controller('UserController', ['$scope', '$routeParams', '$http', '$rootScope', function($scope, $routeParams, $http, $rootScope){
	var controller = this;

	this.getGitHubJobs = function(searchInput){
		var url = '/jobs/ghjobs/' + searchInput;
		$http({
			method: 'GET',
			url: url
		}).then(function(response){
			controller.jobList = response.data
			console.log(response.data);
			console.log(url);
			console.log(searchInput);
		}, function(response){
			console.log('Error: ' + response);
		})
	}

// The following function was located on github from user eucuepo. Reference information will be listed in README file
	$scope.getLinkedInData = function() {
		if(!$scope.hasOwnProperty('userprofile')){
			IN.API.Profile('me').fields(
				["id", "firstName", "lastName", "pictureUrl", "publicProfileUrl"]).result(function(result){

				$rootScope.$apply(function() {
					controller.userprofile = result.values[0];
					console.log(controller.userprofile);
					$rootScope.userprofile = controller.userprofile;
					$rootScope.loggedUser = true;
				});
			});
		}
	}




	// this.getUserInfo = function(data){   original attempt at extracting linkedIn user data for html page.
	// 	$http ({
	// 		method: 'GET',
	// 		url: 'https://api.linkedin.com/v1/people/~?format=json'
	// 		}).then(function(data){
	// 			console.log(data);
	// 		});
	// }

}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$locationProvider.html5Mode({enabled:true});

	$routeProvider.when('/', {
		templateUrl: 'index.html',
		controller: 'UserController',
		controllerAs: 'user'
	});

}]);
