let name = document.getElementById("name");
let email = document.getElementById("email");
let output = document.getElementById("user-container");
let table = document.querySelector("table");

output.innerHTML += `
    <tr>
    <td id="name">${JSON.parse(localStorage.getItem("userData"))[0].userName}</td>
    <td id="email">${JSON.parse(localStorage.getItem("userData"))[0].email}</td>
    <td><a href="#"  onClick="deleteUser(this)"class="delete">Delete</a></td>
    </tr>`
;

let deleteUser = (e) => {
    e.parentElement.parentElement.remove();
}