let form = document.querySelector("form");
let userName = document.getElementById("form-name");
let email = document.getElementById("form-email");
let message = document.getElementById("form-message")
var nameError = document.getElementById("name-error");
var emailError = document.getElementById("email-error");
var messageError = document.getElementById("message-error");
var submitError = document.getElementById("submit-error");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
})

function validateName() {
    var name = document.getElementById('form-name').value;
    if (name.length == 0) {
        nameError.innerHTML = 'Name required';
        return false;
    }
    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        nameError.innerHTML = 'Full name';
        return false;
    }
    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
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


function validateMessage() {
    var message = document.getElementById("form-message").value;
    var required = 10;
    var left = required - message.length;

    if (left > 0) {
        messageError.innerHTML = left + " characters at least";
        return false;
    }

    messageError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateForm() {
    if (!validateName() || !validateMail() || !validateMessage()) {
        submitError.innerHTML = "PLease fix above errors";
        setTimeout(function () { submitError.style.display = "none" }, 2000)
    } else {
        success.style.display = "block";
        setTimeout(function () { success.style.display = "none" }, 1000)
        sendMsg();
    }
}



const sendMsg = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var data = {
        name: userName.value,
        email: email.value,
        message: message.value,
    };

    const returnedMsg = await axios.post("https://api.bahatiyves.com/api/messages", data)
        .then((result) => { (console.log(result.data.msg), resetForm()) })
        .catch((error) => { return error.response.data.msg });;
        submitError.innerHTML = `${returnedMsg}`;
}










// let msg = [];


// let myMessage = () => {
//     msg.push({
//         userName: userName.value,
//         email: email.value,
//         message: message.value
//     });
//     localStorage.setItem("message", JSON.stringify(msg))
//     resetForm();
// };

let resetForm = () => {
    userName.value = "";
    email.value = "";
    message.value = "";
    nameError.innerHTML = "";
    emailError.innerHTML = "";
    messageError.innerHTML = "";
    submitError.innerHTML = "";
}


// let msg = [];


// let myMessage = () => {
//     msg.push({
//         userName: userName.value,
//         email: email.value,
//         message: message.value
//     });
//     localStorage.setItem("message", JSON.stringify(msg))
//     resetForm();
// };

// let resetForm = () => {
//     userName.value = "";
//     email.value = "";
//     message.value = "";
//     nameError.innerHTML = "";
//     emailError.innerHTML = "";
//     messageError.innerHTML = "";
//     submitError.innerHTML = "";
// }

