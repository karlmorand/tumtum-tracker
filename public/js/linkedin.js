function onLoad(){
  IN.Event.on(IN, "auth", function(){
  	linkedinProfileData();
  });
}

function onSuccess(data) {
  console.log(data);
  alert('Welcome ' + data.firstName)
}

function onError(error){
  console.log(error);
}

function getProfileData(){
  IN.API.Raw("/people/~").result(onSuccess).error(onError);
}

function linkedinProfileData (){
	angular.element(document.getElementById('userProfile')).scope().$apply(
		function($scope) {
			$scope.getLinkedInData(); // the following function was located on github from user eucuepo. User who created function will be referenced in README
		}
	);
}
