window.onload = event => {
    getBlog();
};


const getBlog = async () => {
    axios.get("http://localhost:4000/api/blogs")
        .catch((error) => {
            console.log(error)
        })
        .then((data) => {
            let cont = document.querySelector(".blog-container");            
            blog = data.data.data;
            let str = '';
            test = blog.map(blog => {
                let add = ` 
                <div class="box first">
                <div class="blog-img">
                    <img src="${blog.image}" alt="" width="310" height="240">
                </div>
                <div class="content">
                    <h5>${blog.title}</h5>
                    <span>${blog.created_on}</span>
                    <a href="uxd.html" class="content-details">${blog.subtitle}<a class="read" href="uxd.html">Read more</a>
                    </a>
                </div>
            </div>`
                str += add;
            })
            cont.innerHTML = str;
            API();

        })
        .catch((error) => error);
}