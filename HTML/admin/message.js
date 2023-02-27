window.onload = event => {
    addMsg();
};


const API = async () => {
    try {
        const response = await API.get('/messages');
        console.log(response.data);
    } catch (error) {
        console.log(error.msg);
    }
}


const addMsg = () => {

    const API = axios.create({ baseURL: 'https://api.bahatiyves.com/api' });

    API.interceptors.request.use((req) => {
        if (localStorage.getItem('admintoken')) {
            req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('admintoken'))}`;
        }
        return req;
    });

    let msgIds = [];
    API.get("/messages")
        .then((data) => {
            let Msgoutput = document.querySelector(".msg-container");
            msgs = data.data.data;
            let str = '';
            test = msgs.map(item => {
                let add = `
            <tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.message}</td>
            <td class="delete msg_${item._id}">Delete</td>
        </tr>`
                str += add;
                msgIds.push(item._id)
            })
            Msgoutput.innerHTML = str;
            msgIds.map(id => {
                document.querySelector(`.msg_${id}`).addEventListener("click", async () => {

                    await API.delete(`/messages/${id}`)
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




// let output = document.querySelector(".msg-container");
// let table = document.querySelector("table");


// function addM() {
//     var msg = JSON.parse(localStorage.getItem("message"));
//     let str = '';
//     msg.map(m => {

//         let test = `
//     <tr id="${m}">
//       <td class="name">${m.userName}</td>
//       <td class="email">${m.email}</td>
//       <td class="message">${m.message}</td>
//       <td> <a href="#" onClick="deleteMsg(this)" class="delete">Delete</a></td>
//     </tr>`
//         str += test;

//     });
//     output.innerHTML = str;
// }

// addM();





// <tbody class="msg-container">
// <td>ajanaj</td>
// <td>ahbajah</td>
// <td>ajjaa</td>
// <td class="delete">Delete</td>
// </tbody>

let deleteMsg = (e) => {
    var msg = JSON.parse(localStorage.getItem("message"));
    e.parentElement.parentElement.remove();
    msg.splice(e.parentElement.parentElement.id, 1)
    localStorage.setItem("message", JSON.stringify(msg))
}