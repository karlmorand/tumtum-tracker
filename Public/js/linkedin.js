function onLoad(){
  IN.Event.on(IN, "auth", getProfileData);
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
