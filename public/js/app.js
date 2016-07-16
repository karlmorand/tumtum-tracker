var app = angular.module('TumTumApp', ['ngRoute', 'ngSanitize']);

app.controller('UserController', ['$scope', '$routeParams', '$http', '$rootScope', function($scope, $routeParams, $http, $rootScope){
	var controller = this;
	$scope.newJobCount = 0;

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

	$scope.savedJobs = function(){
		$http ({
			method: 'GET',
			url: 'users/savedJobs/' + controller.userprofile.id
		}).then(function(response){
			console.log('savedjobs:');
			console.log('hello there!');
			controller.userJobs = response.data;
		}, function(response) {
			console.log(response);
			});
	};

// The following function was located on github from user eucuepo. Reference information will be listed in README file
	$scope.getLinkedInData = function() {
		if(!$scope.hasOwnProperty('userprofile')){
			IN.API.Profile('me').fields(
				["id", "firstName", "lastName", "pictureUrl", "publicProfileUrl"]).result(function(result){

				$rootScope.$apply(function() {
					controller.userprofile = result.values[0];
					$rootScope.userprofile = controller.userprofile;
					$rootScope.loggedUser = true;

				});
				$http({
					method: 'GET',
					url: 'users/loggedin/' + controller.userprofile.id
				}).then(function(response){
					console.log(response);
					$scope.savedJobs();
				}, function(response){
					console.log(response);
				})

			});
		}
	}



// get Job detail and display in a template
	this.getJob = function(jobInfo){
		console.log(jobInfo);
		this.selectedJob = jobInfo;
		controller.jobExists = '';
	};
	

	this.addJob = function(jobInfo){
		var url = 'users/addjob/' + controller.userprofile.id;
		console.log(jobInfo);

		$http({
			method: 'POST',
			url: url,
			data: jobInfo
		}).then(function(response){
			console.log(response);
			controller.jobExists = response.data;
			$scope.savedJobs();
		$scope.newJobCount += 1;
			console.log(newJobCount);
		}, function(response){
			console.log('Error adding job:');
			console.log(response.data);
		});
	};




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
	}).when('/users/positions/:id',{
		templateUrl: 'partials/jobDetail.html',
		controller: 'UserController',
		controllerAs: 'user'
	});

}]);
