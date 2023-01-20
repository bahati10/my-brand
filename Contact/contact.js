var nameError = document.getElementById("name-error");
var emailError = document.getElementById("email-error");
var messageError = document.getElementById("message-error");
var submitError = document.getElementById("submit-error");


function validateName() {
    var name = document.getElementById('form-name').value;
    localStorage.setItem("name", name);
    if(name.length == 0){
        nameError.innerHTML = 'Name required';
        return false;
    }
    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameError.innerHTML = 'Full name';
        return false;
    }
    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    localStorage.setItem("name", name);
    return true;
}

function validateMail() {
    var email = document.getElementById("form-email").value;
    localStorage.setItem("email", email)

    if(email.length == 0){
        emailError.innerHTML = 'Email Required';
        return false;
    } 
    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{3,4}$/)){
        emailError.innerHTML = "Invalid Email";
        return false;
    }

    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    localStorage.setItem("email", email);
    return true;
}


function validateMessage(){
    var message = document.getElementById("form-message").value;
    var required = 40;
    var left = required - message.length;

    if(left > 0) {
        messageError.innerHTML = left + " characters at least";
        return false;
    }

    messageError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'; 
    localStorage.setItem("message", message);
    return true;
}

function validateForm() {
    if(!validateName() || !validateMail() || !validateMessage()) {
        submitError.innerHTML = "PLease fix above errors";
        setTimeout(function() {submitError.style.display = "none"}, 2000)
        return false;
    }

    alert("Message sent successfully.")
}