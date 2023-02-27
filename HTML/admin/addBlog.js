let form = document.querySelector("form");
let title = document.querySelector("#form-title");
let subtitle = document.querySelector("#form-subtitle");
let content = document.querySelector("#form-content");
let image = document.getElementById("myFile");
var titleError = document.getElementById("title-error");
var subtitleError = document.getElementById("subtitle-error");
var contentError = document.getElementById("content-error");
var fileError = document.getElementById("url-error");
var submitError = document.getElementById("submit-error");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
})


function validateTitle() {
    var title = document.getElementById('form-title').value;
    if (title.length < 20 || title.length < 0) {
        titleError.innerHTML = 'Too short';
        return false;
    }

    titleError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateSubtitle() {
    var subtitle = document.getElementById("form-subtitle").value;
    var required = 66;
    var left = required - subtitle.length;

    if (left > 0) {
        subtitleError.innerHTML = left + " characters at least";
        return false;
    }

    subtitleError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}


function validateURL() {
    var image = document.getElementById('myFile').value;
    if (image.length < 0) {
        fileError.innerHTML = 'Please Add Image URL';
        return false;
    }

    fileError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}


function validateContent() {
    var content = document.getElementById("form-content").value;
    var required = 300;
    var left = required - content.length;

    if (left > 0) {
        contentError.innerHTML = left + " characters at least";
        return false;
    }

    contentError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}


function validateForm() {
    if (!validateTitle() || !validateSubtitle() || !validateURL() || !validateContent()) {
        submitError.innerHTML = "PLease fix above errors";
        setTimeout(function () { submitError.style.display = "none" }, 2000)
        return false;
    } else {
        success.style.display = "block";
        setTimeout(function () { success.style.display = "none" }, 900);
        addBlog();
    }
}



// let imageUrl;
// image.addEventListener("change", function () {
//       const fileReader = new FileReader();
//       fileReader.addEventListener("load", () => {
//         imageUrl = fileReader.result;
//       });
//       fileReader.readAsDataURL(this.files[0]);
//     });


const API = async () => {
    try {
        const response = await API.get('/blogs');
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}



const addBlog = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = {
        title: title.value,
        subtitle: subtitle.value,
        image: image.value,
        content: content.value,
    };



    const API = axios.create({ baseURL: 'https://api.bahatiyves.com/api' });
    API.interceptors.request.use((req) => {
        if (localStorage.getItem('admintoken')) {
            req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('admintoken'))}`;
        }
        return req;
    });
    const returnedPost = await API.post("/blogs", data)
        .then((result) => { (console.log(result), resetForm()) })
        .catch((error) => { return error.response.data.msg });
    submitError.innerHTML = `${returnedPost}`;

}




// let blogCards = document.getElementById("blog-cards");
// document.getElementById("blog-form").addEventListener("submit", function (e) {
//   e.preventDefault();
//   let title = document.getElementById("blogTitle");
//   let description = document.getElementById("blogMessage");
//   let blogSubmit = document.getElementById("blogSubmit");

//   let myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   let data = {
//     image: imageUrl,
//     title: title.value,
//     description: description.value,
//   };

//   let requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: JSON.stringify(data),
//     redirect: "follow",
//   };

//   fetch("http://localhost:5000/api/blogs", requestOptions)
//     .then((response) => response.json())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
//   blogSubmit.textContent = "Blog added well";
//   document.getElementById("blog-form").reset();
// });

// //Get Blog
























// let blogs = [];


// let myBlog = () => {
//     blogs.push({
//         Blog_title: title.value,
//         Blog_Subtitle: subtitle.value,
//         Blog_content: content.value
//     });

//     localStorage.setItem("Blogs", JSON.stringify(blogs))
//     resetForm();
//     next();
// };


let resetForm = () => {
    content.value = "";
    title.value = "";
    subtitle.value = "";
    image.value = "";
    titleError.innerHTML = "";
    fileError.innerHTML = "";
    subtitleError.innerHTML = "";
    contentError.innerHTML = "";
    submitError.innerHTML = ""
}
