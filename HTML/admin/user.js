window.onload = event => {

    let userOutput = document.querySelector(".user-container");


    function addU() {
        var usr = JSON.parse(localStorage.getItem("userData"));
        let str = '';
        usr.map(u => {
            let test = `
        <tr id="${u}">
          <td class="name">${u.name}</td>
          <td class="email">${u.email}</td>
          <td><a href="#"  onClick="deleteUsr(this)" class="delete">Delete</a></td>
        </tr> 
        `
            str += test;
        });
        userOutput.innerHTML = str;
    }

    addU();
    
};

let deleteUsr = (e) => {
    var usr = JSON.parse(localStorage.getItem("userData"));
    e.parentElement.parentElement.remove();
    usr.splice(e.parentElement.parentElement.id, 1)
    localStorage.setItem("userData", JSON.stringify(usr))
}