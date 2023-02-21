window.onload = event => {




    async function getUsers() {
        const getUsers = await fetch("http://localhost:4000/api/users");
        const response = await getUsers.json();
        let userOutput = document.querySelector(".user-container");
        for (let i = 0; i < response.length; i++) {
            console.log(i.names);

            userOutput.innerHTML += `
                        <tr id="">
                          <td class="name">${i.names}</td>
                          <td class="email">${i.email}</td>
                          <td><a href="#"  onClick="deleteUsr(this)" class="delete">Delete</a></td>
                        </tr>`
        }
    }
    getUsers();


    // const url = "http://localhost:4000/api/users";

    // async function getapi(url) {
    //     const response = await fetch(url)
    //     var data = await response.json();
    //     console.log(data);
    //     show(data);

    // }

    // getapi(url)

    // function show(data) {
    //     let str = "";
    //     data.map(u => {
    //         let test = `
    //         //     <tr id="">
    //         //       <td class="name">${u.names}</td>
    //         //       <td class="email">${u.email}</td>
    //         //       <td><a href="#"  onClick="deleteUsr(this)" class="delete">Delete</a></td>
    //         //     </tr> 
    //         `

    //         str += test;
    //     })
    //     userOutput.innerHTML = str;
    // }

};




