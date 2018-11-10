var logInForm = document.getElementById('devise-log-in');
var logInInputs = document.getElementsByClassName("devise-log-in-input")
var signUpForm = document.getElementById('devise-sign-up');
var signUpInputs = document.getElementsByClassName("devise-sign-up-input")

function clickLogIn(){
  logInForm.style.display = "block";
  signUpForm.style.display = "none";
  logInButton.style.backgroundImage = "linear-gradient(#5eabd8,#3797CF)";
  signUpButton.style.backgroundImage = "linear-gradient(#808080,#AEAEAE)";
  for(var i=0; i < logInInputs.length; i++){
    logInInputs[i].disabled = false;
  }
  for(var i=0; i < signUpInputs.length; i++){
    signUpInputs[i].disabled = true;
  }
}

function clickSignUp(){
  logInForm.style.display = "none";
  signUpForm.style.display = "block";
  logInButton.style.backgroundImage = "linear-gradient(#808080,#AEAEAE)";
  signUpButton.style.backgroundImage = "linear-gradient(#5eabd8,#3797CF)";
  for(var i=0; i < logInInputs.length; i++){
    logInInputs[i].disabled = true;
  }
  for(var i=0; i < signUpInputs.length; i++){
    signUpInputs[i].disabled = false;
  }
}

var logInButton = document.getElementById("devise-log-in-button")
var signUpButton = document.getElementById("devise-sign-up-button")

if(logInButton && signUpButton){
  logInButton.addEventListener("click", clickLogIn);
  signUpButton.addEventListener("click", clickSignUp);

  clickLogIn()
}
