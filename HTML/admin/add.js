let form = document.querySelector("form");
let title = document.getElementById("form-title");
let subtitle = document.getElementById("form-subtitle");
let content = document.getElementById("form-content");
let image = document.getElementById("myFile");
var titleError = document.getElementById("title-error");
var subtitleError = document.getElementById("subtitle-error");
var contentError = document.getElementById("content-error");
var submitError = document.getElementById("submit-error");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
})


function validateTitle() {
    var title = document.getElementById('form-title').value;
    if(title.length < 30 || title.length < 0){
        titleError.innerHTML = 'Too short';
        return false;
    }

    titleError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateSubtitle(){
    var subtitle = document.getElementById("form-subtitle").value;
    var required = 75;
    var left = required - subtitle.length;

    if(left > 0) {
        subtitleError.innerHTML = left + " characters at least";
        return false;
    }

    subtitleError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'; 
    return true;
}


function validateContent(){
    var content = document.getElementById("form-content").value;
    var required = 300;
    var left = required - content.length;

    if(left > 0) {
        contentError.innerHTML = left + " characters at least";
        return false;
    }

    contentError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'; 
    return true;
}



function validateForm() {
    if(!validateTitle() || !validateSubtitle() || !validateContent()) {
        submitError.innerHTML = "PLease fix above errors";
        setTimeout(function() {submitError.style.display = "none"}, 2000)
        return false;
    }else{
        success.style.display = "block";
        setTimeout(function() {success.style.display = "none"}, 900);
        myBlog();
    }
}








const addBlog = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = {
        email: email.value,
        password: password.value,
    };


    // requestOptions = {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: JSON.stringify(data),
    //     redirect: "follow",
    // };

    const returnedData = await axios.post("http://63.250.40.79:4000/api/users/login/admin", data)
        .then((result) => { (console.log(result.data.msg), localStorage.setItem("admintoken", JSON.stringify(result.data.token)), nextRoute(), resetForm()) })
        .catch((error) => { return error.response.data.msg });
    submitError.innerHTML = `${returnedData}`;

}























let blogs = [];


let myBlog = () => {
    blogs.push({
        Blog_title: title.value,
        Blog_Subtitle: subtitle.value,
        Blog_content: content.value
    });

    localStorage.setItem("Blogs", JSON.stringify(blogs))
    resetForm();
    next();
};

// let next = () => {
//     window.setTimeout(function () {
//         window.location.href = "blogs.html";

//     }, 2000);
// }


// let resetForm = () => {
//     content.value = "";
//     title.value = "";
//     subtitle.value = "";
//     image.value = "";
//     titleError.innerHTML = "";
//     subtitleError.innerHTML = "";
//     contentError.innerHTML = "";
//     submitError.innerHTML = ""
// }
