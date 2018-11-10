let logInForm = document.getElementById('devise-log-in');
let logInInputs = document.getElementsByClassName("devise-log-in-input")
let signUpForm = document.getElementById('devise-sign-up');
let signUpInputs = document.getElementsByClassName("devise-sign-up-input")

let clickLogIn = () => {
  logInForm.style.display = "block";
  signUpForm.style.display = "none";
  logInButton.style.backgroundImage = "linear-gradient(#5eabd8,#3797CF)";
  signUpButton.style.backgroundImage = "linear-gradient(#808080,#AEAEAE)";
  for(let i=0; i < logInInputs.length; i++){
    logInInputs[i].disabled = false;
  }
  for(let i=0; i < signUpInputs.length; i++){
    signUpInputs[i].disabled = true;
  }
}

let clickSignUp = () => {
  logInForm.style.display = "none";
  signUpForm.style.display = "block";
  logInButton.style.backgroundImage = "linear-gradient(#808080,#AEAEAE)";
  signUpButton.style.backgroundImage = "linear-gradient(#5eabd8,#3797CF)";
  for(let i=0; i < logInInputs.length; i++){
    logInInputs[i].disabled = true;
  }
  for(let i=0; i < signUpInputs.length; i++){
    signUpInputs[i].disabled = false;
  }
}

let logInButton = document.getElementById("devise-log-in-button")
logInButton.addEventListener("click", clickLogIn);

let signUpButton = document.getElementById("devise-sign-up-button")
signUpButton.addEventListener("click", clickSignUp);

clickLogIn()
