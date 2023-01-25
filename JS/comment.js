var form = document.querySelector("form");
var cmnt = document.getElementById("form-comment");
let success = document.getElementById("success");
var commentError = document.getElementById("comment-error");
var submitError = document.getElementById("submit-error");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
})


function validateComment(){
    var comment = document.getElementById("form-comment").value;
    var required = 8;
    var left = required - comment.length;
    if(left > 0) {
        commentError.innerHTML = left + " characters at least";
        return false;
    }
    commentError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    localStorage.setItem("comment", comment)
    return true;
}



function validateForm() {
    if(!validateComment()) {
        submitError.innerHTML = "PLease fix above error";
        setTimeout(function() {submitError.style.display = "none"}, 1000)
        return false;
    }else{
        success.style.display = "block";
        setTimeout(function() {success.style.display = "none"}, 900);
        myComment();
    }
}



let comment = [];


let myComment = () => {
    comment.push({
        comment: cmnt.value,
    });

    localStorage.setItem("userComments", JSON.stringify(comment))
    resetForm();
    next();
};

let next = () => {
    window.setTimeout(function () {
        window.location.href = "uxd.html";

    }, 1300);
}


let resetForm = () => {
    cmnt.value = "";
    commentError.innerHTML = "";
    submitError.innerHTML = ""
}
