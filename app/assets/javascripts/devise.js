let logInForm = document.getElementById('devise-log-in');
let signUpForm = document.getElementById('devise-sign-up');

let clickLogIn = () => {
  logInForm.style.display = "block";
  signUpForm.style.display = "none";
  logInButton.style.backgroundImage = "linear-gradient(#5eabd8,#3797CF)";
  signUpButton.style.backgroundImage = "linear-gradient(#808080,#AEAEAE)";
}

let clickSignUp = () => {
  logInForm.style.display = "none";
  signUpForm.style.display = "block";
  logInButton.style.backgroundImage = "linear-gradient(#808080,#AEAEAE)";
  signUpButton.style.backgroundImage = "linear-gradient(#5eabd8,#3797CF)";
}

let logInButton = document.getElementById("devise-log-in-button")
logInButton.addEventListener("click", clickLogIn);

let signUpButton = document.getElementById("devise-sign-up-button")
signUpButton.addEventListener("click", clickSignUp);
