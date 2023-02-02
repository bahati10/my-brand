let form = document.querySelector("form");
let userName = document.getElementById("form-name");
let email = document.getElementById("form-email");
let password = document.getElementById("form-password");
let output = document.getElementById("output");
let success = document.getElementById("success");
let success2 = document.getElementById("success2");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
})



var nameError = document.getElementById("name-error");
var emailError = document.getElementById("email-error");
var passwordError = document.getElementById("password-error");
var submitError = document.getElementById("submit-error");



function validateMail() {
    var email = document.getElementById("form-email").value;

    if (email.length == 0) {
        emailError.innerHTML = 'Email Required';
        return false;
    }
    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{3,4}$/)) {
        emailError.innerHTML = "Invalid Email";
        return false;
    }

    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}


function validatePassword() {
    var password = document.getElementById("form-password").value;

    if (password.length == 0) {
        passwordError.innerHTML = "Password required";
        return false;
    }
    if (password.length <= 8) {
        passwordError.innerHTML = "Must be 8 characters or more";
        return false;
    }

    passwordError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateForm() {
    if (!validateMail() || !validatePassword()) {
        submitError.innerHTML = "PLease fix above errors";
        setTimeout(function () { submitError.style.display = "none" }, 2000)
        return false;
    } else {
        compare();
    }
}

let compare = () => {
    let info = JSON.parse(localStorage.getItem("userData"))
    success.style.display = "block";
    setTimeout(function() {success.style.display = "none"}, 900);
    if (email.value === "admin@gmail.com" && password.value === "Admin12345") {
        setTimeout(function () { window.location.href = "/HTML/admin/blog.html"; }, 900);
    }else{
        success.style.display = "block";
        setTimeout(function() {success.style.display = "none"}, 900);
        next();
    }
}


let next = () => {
    window.setTimeout(function () {
        window.location.href = "blog.html";
    }, 1700);
}


let resetForm = () => {
    userName.value = "";
    email.value = "";
    password.value = "";
    nameError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    submitError.innerHTML = ""
}