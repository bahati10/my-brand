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



function validateName() {
    var name = document.getElementById('form-name').value;
    if (name.length == 0) {
        nameError.innerHTML = 'Name required';
        return false;
    }
    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        nameError.innerHTML = 'Full name required';
        return false;
    }
    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    localStorage.setItem("name", name);
    return true;
}

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
    if (!validateName() || !validateMail() || !validatePassword()) {
        submitError.innerHTML = "PLease fix above errors";
        setTimeout(function () { submitError.style.display = "none" }, 2000)
    } else {
        addUser();
    }

}




const addUser = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = {
        names: userName.value,
        email: email.value,
        password: password.value,
    };

    const returnedUser = await axios.post("https://api.bahatiyves.com/api/users", data)

        .then((result) => { if (result.ok == false) {
                console.log("Error  ", result, result.data.msg)
            } else {
                success.style.display = "block";
                setTimeout(function () { success.style.display = "none" }, 900)
                console.log(result), resetForm(), next()
            }
        })
        .catch((error) => { return error.response.data.msg });
        submitError.innerHTML = `${returnedUser}`;
}



// let second = () => {
//     let info = JSON.parse(localStorage.getItem("userData"))
//     info.map(m => {
//         if (email.value === m.email) {
//             alert("Exist");
//         } else {
//             myData();
//         }
//     })
//     resetForm();
// }


// let data = [];


// let myData = () => {
//     data.push({
//         name: userName.value,
//         email: email.value,
//         password: password.value
//     });
//     localStorage.setItem("userData", JSON.stringify(data))
//     resetForm();
//     next();
// };


let next = () => {
    window.setTimeout(function () {
        window.location.href = "login.html";

    }, 1700);
}

let resetForm = () => {
    userName.value = "";
    email.value = "";
    password.value = "";
    nameError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    submitError.innerHTML = "";
}
