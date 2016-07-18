# TumTum-tracker
GA Project 3 - job tracker

![alt=main-wireframe](https://github.com/karlmorand/tumtum-tracker/blob/master/reference_material/TumTum_Tracker_Main.jpg)
##Synopsis

Take your LinkedIn experience to the next level with TumTum Tracker. The Tum Tum tracker is a seamless organizer for job searching ane networking. Store a listing of Companies you are interested in, review your goal tracker, and store important links that can be sent to employers on the fly.  


## The following MVP features will need to be considered for basic application of the TumTum Tracker:

- Connect the user's existing LinkedIn account to log in and out.
- A searchBox to search companies with active job postings by name.
- The ability to add companies to a list titled "Organizations of Interest".

## The following Stretch features will be considered for additional application of the TumTum Tracker:

- Ability to use the app without an existing LinkedIn account.
- Add additional search functionality for "job type", "job category" and "location" when searching for companies.
- A search box to locate active job postings.
- The ability to add job postings to a list titled "Jobs of Interest"
- Ability to click on a job post list item to redirect to that job posting page.
- Add additional search functionality for "job type", "job category" and "location" when searching for companies.
- Company name in the list will link the user to the company's website.
- Goal tracker that user can add, update and delete items from to track their own progress.
- Job Search checklist to store links to user's resume, portfolio, job profiles, and gitHub


## Code Example
The following code example demonstrates how we utilize the Github jobs API to access a listing of active job posts within angular to display the search results in our getJob partial view:
```
	this.getGitHubJobs = function(){

		if (controller.searchKeyword == ''){
			var urlParams = 'location=' + controller.searchLocation
		} else if (controller.searchLocation == ''){
			var urlParams = 'description=' + controller.searchKeyword
		} else {
			var urlParams = 'description=' + controller.searchKeyword + '&location=' + controller.searchLocation
		}
		var url = '/jobs/ghjobs/' + urlParams
		$http({
			method: 'GET',
			url: url
		}).then(function(response){
			controller.jobList = response.data
			$scope.showGoalTracker = false;
			$scope.jobTools = '';
			$scope.getJobShort = '';
			this.selectedJob = '';
			$scope.jobDetail = '';
			$scope.jobShort = '';
		}, function(response){
			console.log('Error: ' + response);
		})
	}
```
## Motivation

We wanted to provide a more streamlined approach to tracking our job seeking endeavors. Utilizing information from LinkedIn's API, we wanted a place to organize our listing of company interests, track our goals and store important links to resume's, portfolio sites and more to make it easy to send to prospective employers on the fly.

### TumTum MVP Tracker:  (https://trello.com/b/QVyqQJxd)
### Project 3 Daily Tracker:  (https://trello.com/b/1PvvoBtJ)


## Installation

Visit our site at (https://tumtum-tracker.herokuapp.com/) and sign in with your existing LinkedIn account.

## API Reference

LinkedIn API: (https://developer.linkedin.com/docs)
Github Jobs API: (https://jobs.github.com/api)

Skeleton CSS was the framework used for this project. (http://getskeleton.com/)


### The following node packages will be utilized:

- Express
- Mongoose
- request
- body-parser
- method-override
- dotenv


## Additional reference:

Propogation of linkedIn user profile code (in linkedin.js lines 3, 24-30 and app.js lines 6-19) referenced from user eucuepo (https://github.com/eucuepo/angular-linkedin/tree/master/angular-linkedin/js)

Visit Code Pioneer.wordpress.com for further explanation: (https://codepioneer.wordpress.com/2013/09/28/angularjs-log-in-with-linkedin/)
