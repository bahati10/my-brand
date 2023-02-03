window.onload = event => {

    let output = document.querySelector(".msg-container");
    let table = document.querySelector("table");


    function addM() {
        var msg = JSON.parse(localStorage.getItem("message"));
        let str = '';
        msg.map(m => {

            let test = `
        <tr id="${m}">
          <td class="name">${m.userName}</td>
          <td class="email">${m.email}</td>
          <td class="message">${m.message}</td>
          <td> <a href="#" onClick="deleteMsg(this)" class="delete">Delete</a></td>
        </tr>`
            str += test;

        });
        output.innerHTML = str;
    }

    addM();
};

let deleteMsg = (e) => {
    var msg = JSON.parse(localStorage.getItem("message"));
    e.parentElement.parentElement.remove();
    msg.splice(e.parentElement.parentElement.id, 1)
    localStorage.setItem("message", JSON.stringify(msg))
}