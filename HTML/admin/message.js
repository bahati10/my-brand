let name = document.getElementById("name");
let email = document.getElementById("email");
let message = document.getElementById("message");
let output = document.getElementById("msg-container");
let table = document.querySelector("table");


    output.innerHTML += `
    <tr>
       <td id="name">${JSON.parse(localStorage.getItem("message"))[0].userName}</td>
       <td id="email">${JSON.parse(localStorage.getItem("message"))[0].email}</td>
       <td id="message">${JSON.parse(localStorage.getItem("message"))[0].message}</td>
       <td><a href="#" onClick="deleteMsg(this)" class="delete">Delete</a></td>
    </tr>
    `;
    

let deleteMsg = (e) => {
    e.parentElement.parentElement.remove();
}
