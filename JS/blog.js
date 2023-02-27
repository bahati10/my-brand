const logOut = document.querySelector(".signup");

window.onload = event => {
    getBlog();
};

logOut.addEventListener("click", () => {
    localStorage.removeItem("usertoken");
    next();
}
)


let next = () => {
    window.setTimeout(function () {
        window.location.href = "login.html";
    }, 1000);
}


const getBlog = async () => {
    axios.get("https://api.bahatiyves.com/api/blogs")
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