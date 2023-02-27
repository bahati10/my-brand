window.onload = event => {
    getUsers();
};

const API = async () => {
    try {
        const response = await API.get('/users/admin');
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}


const getUsers = async () => {
    const API = axios.create({ baseURL: 'https://api.bahatiyves.com/api' });

    API.interceptors.request.use((req) => {
        if (localStorage.getItem('admintoken')) {
            req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('admintoken'))}`;
        }
        return req;
    });
    API.get("/users/admin")
        .then((data) => {
            console.log(data);
            let userOutput = document.querySelector(".user-container");
            msgs = data.data.data;
            let str = '';
            test = msgs.map(item => {
                let add = `
                            <tr id="${item._id}">
                              <td class="name">${item.names}</td>
                              <td class="email">${item.email}</td>
                              <td><a href="#"  onClick="deleteUsr(this)" class="delete">Delete</a></td>
                            </tr>`
                str += add;
            })
            userOutput.innerHTML = str;
            API();
        })
        .catch((error) => error);
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

