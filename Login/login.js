var emailError = document.getElementById("email-error");
var passwordError = document.getElementById("password-error");
var submitError = document.getElementById("submit-error");
var icon = document.getElementsByClassName("icon");


document.querySelectorAll("input").addEventListener("click", icon.style.display = "none");




function validateMail() {
    var email = document.getElementById("form-email").value;

    if(email.length == 0){
        emailError.innerHTML = 'Email Required';
        return false;
    } 
    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{3,4}$/)){
        emailError.innerHTML = "Invalid Email";
        return false;
    }

    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}


function validatePassword(){
    var password = document.getElementById("form-password").value;

    if(password.length == 0) {
        passwordError.innerHTML = "Password required";
        return false;
    }
    if(password.length <= 8) {
        passwordError.innerHTML = "Must be 8 characters or more";
        return false;
    }

    passwordError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateForm() {
    if(!validateMail() || !validatePassword()) {
        submitError.innerHTML = "PLease fix above errors";
        setTimeout(function() {submitError.style.display = "none"}, 2000)
        return false;
    }
}