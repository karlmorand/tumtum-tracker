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
		console.log('Hello from savedJobs');
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
		console.log('hello from savedGoals!!!');
		$http({
			method: 'GET',
			url:'users/savedGoals/' + controller.userprofile.id
		}).then(function(response){
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
					$scope.showGoalTracker = false;

				});
				$http({
					method: 'GET',
					url: 'users/loggedin/' + controller.userprofile.id
				}).then(function(response){
					console.log(response);
					$scope.savedJobs();
					$scope.savedGoals();
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
		this.selectedJob = '';
		$scope.jobDetail = '';
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
	        this.partial_url = 'partials/jobTruncate.html';
	    }
	};

	this.switchGetJob = function(getJobShort){
	
	    if(this.partial_url == 'partials/jobTruncate.html'){
	        this.partial_url = 'partials/jobDetail.html';
	        this.getJob(getJobShort);
	    } else {
	        this.partial_url = 'partials/jobTruncate.html';
	    }
	};

	this.userJobDetail = function(jobDetail){
		console.log('this is the userJobDetail function');
		console.log(jobDetail);
		$scope.jobDetail = jobDetail;
		controller.jobExists = '';
		this.selectedJob = '';
		$scope.jobShort = '';
		$scope.getJobShort = '';
	};

	this.showGoalTracker = function(){
		$scope.showGoalTracker = !$scope.showGoalTracker;
		this.selectedJob = '';
		$scope.jobDetail = '';
		$scope.jobShort = '';
		$scope.getJobShort = '';
	}

// get Job detail and display in a template
	this.getJob = function(getJobShort){
		console.log(getJobShort);
		this.selectedJob = getJobShort;
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
			$scope.jobShort = '';
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



	this.newItem = function(){
		var url = 'users/additem/' + controller.userprofile.id;
		console.log(this.itemTitle);
		var itemId = Math.floor(Math.random()*1000000000000);


		var itemToPost = {'itemTitle': this.itemTitle,
											'itemNotes': this.itemNotes,
											'done': false,
											'id': itemId}
		$http({
			method: "POST",
			url: url,
			data: itemToPost
		}).then(function(response){
			controller.itemTitle = null;
			controller.itemNotes = null;
			$scope.savedGoals();
		}, function(response){
			console.log(response);
		});
	}

this.deleteItem = function(goal) {
	$http({
		method: 'DELETE',
		url: 'users/deletegoal/'+ controller.userprofile.id + '/' + goal.id
	}).then(function(response){
		$scope.savedGoals();
		console.log(response);
	}, function(response){
		console.log(response);
	})
}

this.completeItem = function(goal){
	$http({
		method: 'POST',
		url: 'users/completeitem/'+ controller.userprofile.id + '/' + goal.id
	}).then(function(response){
		console.log('completed completeitem function');
		console.log(response);
		$scope.savedGoals();
	}, function(response){
		console.log(response);
	})
}


this.submitGoalEdits = function(goal){
	console.log('goal going to editItem');
	console.log(goal);
	$http({
		method: 'POST',
		url: '/users/edititem/' + controller.userprofile.id +'/' + goal.id,
		data: goal
	}).then(function(response){
		$scope.savedGoals();
	}, function(response){
		console.log(response);
	})

	}

this.editItem = function(goal){
	controller.selectedGoal = goal
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
	});
}]);
