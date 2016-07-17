var app = angular.module('TumTumApp', ['ngRoute', 'ngSanitize']);

app.controller('UserController', ['$scope', '$routeParams', '$http', '$rootScope', function($scope, $routeParams, $http, $rootScope){
	var controller = this;
	this.partial_url = 'partials/jobTruncate.html';
	

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
			controller.userJobs = response.data;
		}, function(response) {
			console.log(response);
			});
	};

	$scope.savedGoals = function(){
		console.log('hello there!!!');
		$http({
			method: 'GET',
			url:'users/savedGoals/' + controller.userprofile.id
		}).then(function(response){
			console.log(response.data);
			controller.userGoals = response.data;
		},function(response){
			console.log(response);
		});
	}

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

	this.jobDetailTruncate = function(jobShort){
		$scope.jobShort = jobShort;
		console.log($scope.jobShort);
		$scope.getJobShort = '';
		controller.jobExists = '';
	}

	this.getJobTruncate = function(getJobShort){
		$scope.getJobShort = getJobShort;
		$scope.jobShort = '';
		controller.jobExists = '';
		this.selectedJob = '';
		$scope.jobDetail = '';
	}

	this.switchView = function(jobShort){
		
	    if(this.partial_url == 'partials/jobTruncate.html'){
	        this.partial_url = 'partials/jobDetail.html';
	        this.userJobDetail(jobShort);
	    } else {
	        this.include_url = 'partials/jobTruncate.html';
	    }
	};

	this.switchGetJob = function(getJobShort){
	
	    if(this.partial_url == 'partials/jobTruncate.html'){
	        this.partial_url = 'partials/jobDetail.html';
	        this.getJob(getJobShort);
	    } else {
	        this.include_url = 'partials/jobTruncate.html';
	    }
	};

	this.userJobDetail = function(jobDetail){
		console.log('this is the userJobDetail function');
		console.log(jobDetail);
		$scope.jobDetail = jobDetail;
		controller.jobExists = '';
		this.selectedJob = '';
		$scope.jobShort = '';
	};

// get Job detail and display in a template
	this.getJob = function(jobInfo){
		console.log(jobInfo);
		this.selectedJob = jobInfo;
		controller.jobExists = '';
		$scope.jobDetail = '';
		$scope.jobShort = '';
		$scope.getJobShort = '';
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
		}, function(response){
			console.log('Error adding job:');
			console.log(response.data);
		});
	};

	this.deleteJob = function(jobDetail){

		$http ({
			method: 'DELETE',
			url: 'users/deleteSavedJobs/' + controller.userprofile.id + '/' + jobDetail.id
		}).then(function(response){
			console.log(response);
			$scope.jobDetail = '';
			$scope.savedJobs();
		}, function(response){
			console.log(response);
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

	// For managing the Goals tracker partial



	this.newItem = function(itemTitle){
		var url = 'users/additem/' + controller.userprofile.id;

		$http({
			method: "POST",
			url: url,
			data: {itemTitle}
		}).then(function(response){
			console.log(response);
			$scope.savedGoals();
		}, function(response){
			console.log(response);
		});
	}
}]);



app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$locationProvider.html5Mode({enabled:true});

	$routeProvider.when('/', {
		templateUrl: 'index.html',
		controller: 'UserController',
		controllerAs: 'user'
	}).when('/users/positions/:id',{
		templateUrl: 'partials/jobDetailTruncate.html',
		controller: 'UserController',
		controllerAs: 'user'
	});//.when('/users/items/:id', {
	// 	templateUrl: 'partials/goalsTracker.html',
	// 	controller: 'UserController',
	// 	controllerAs: 'user'
	// });

}]);
