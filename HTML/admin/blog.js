window.onload = event => {
    getBlogs();
};

const API = async () => {
    try {
        const response = await API.get('/blogs');
        console.log(response.data);
    } catch (error) {
        console.log(error.msg);
    }
}


const getBlogs = async () => {
    let blogId = [];
    axios.get("http://localhost:4000/api/blogs")
        .catch((error) => {
            console.log(error)

        })
        .then((data) => {
            let blogOutput = document.querySelector(".blog-container");
            blogs = data.data.data;
            let str = '';
            test = blogs.map(item => {
                let add = `
                        <tr class="box first">
                            <td></td>
                            <td>${item.title}</td>
                            <td>Bahati Yves</td>
                            <td><a href="#" class="edit">Edit</a></td>
                            <td><a href="#" class="delete blg_${item._id}">Delete</a></td>
                        </tr>`
                str += add;
                blogId.push(item._id)
            })

            blogOutput.innerHTML = str;
            blogId.map(id => {
                const API = axios.create({ baseURL: 'http://localhost:4000/api' });

                API.interceptors.request.use((req) => {
                    if (localStorage.getItem('admintoken')) {
                        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('admintoken'))}`;
                    }
                    return req;
                });
                document.querySelector(`.blg_${id}`).addEventListener("click", async () => {

                    await API.delete(`/blogs/${id}`)
                        .then((response) => {
                            if (response.status === 204) {
                                location.reload();
                            }
                        })
                        .catch((error) => console.log("error", error));
                });
                API();
            })

        })
        .catch((error) => error);
}










