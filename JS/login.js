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
        userLogin();
    }
}

const userLogin = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = {
        email: email.value,
        password: password.value,
    };


    // requestOptions = {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: JSON.stringify(data),
    //     redirect: "follow",
    // };

    const returnedData = await axios.post("https://api.bahatiyves.com/api/users/login", data)
        .then((result) => { (console.log(result.data.msg), localStorage.setItem("usertoken", JSON.stringify(result.data.token)), next(), resetForm()) })
        .catch((error) => { return error.response.data.msg });
    submitError.innerHTML = `${returnedData}`;

}



let next = () => {
    window.setTimeout(function () {
        window.location.href = "blog.html";
    }, 1000);
}


let resetForm = () => {
    email.value = "";
    password.value = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    submitError.innerHTML = "";
}