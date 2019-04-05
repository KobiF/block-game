var provider = new firebase.auth.GoogleAuthProvider();
let currentUser = "";
var database = firebase.database();
function logInWithGoogle(){
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult().then(function(result) {
    console.log(result)
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    currentUser = user;
    changeForms(user);
  } else {
    // No user is signed in.
  }
});

function changeForms(user){
  document.getElementById("logInForm").classList.add("hidden")
  document.getElementById("name").innerHTML = user.displayName;
  document.getElementById("submitForm").classList.remove("hidden")
}
function postLevel(string) {
  firebase.database().ref('users/' + userId).add({
    level: string
  });
}
