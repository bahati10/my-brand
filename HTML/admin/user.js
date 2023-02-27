window.onload = event => {
    getUsers();
};


const API = async () => {
    try {
        const response = await API.get('/blogs');
        console.log(response.data);
    } catch (error) {
        console.log(error.msg);
    }
}


const getUsers = () => {

    const API = axios.create({ baseURL: 'https://api.bahatiyves.com/api' });

    API.interceptors.request.use((req) => {
        if (localStorage.getItem('admintoken')) {
            req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('admintoken'))}`;
        }
        return req;
    });



    let userIds = [];
    API.get("/users")
        .then((data) => {
            console.log(data);
            let userOutput = document.querySelector(".user-container");
            msgs = data.data.data;
            let str = '';
            test = msgs.map(item => {
                let add = `
                            <tr id="">
                              <td class="name">${item.names}</td>
                              <td class="email">${item.email}</td>
                              <td><a href="#" class= "delete user_${item._id}">Delete</a></td>
                            </tr>`
                str += add;
                userIds.push(item._id)
            })
            userOutput.innerHTML = str;
            userIds.map(id => {
                document.querySelector(`.user_${id}`).addEventListener("click", async () => {

                    await API.delete(`/users/${id}`)
                        .then((response) => {
                            if (response.status === 204) {
                                location.reload();
                            }
                        })
                        .catch((error) => console.log("error", error));
                });

            })
        })
        .catch((error) => console.log("error", error));
}


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

