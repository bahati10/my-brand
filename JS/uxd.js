var form = document.querySelector("form");
var cmnt = document.getElementById("form-comment");
let success = document.getElementById("success");
var commentError = document.getElementById("comment-error");
var submitError = document.getElementById("submit-error");
var author = document.getElementById("author")
var theComment = document.querySelector(".comment-container")


form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
})


function validateComment() {
    var comment = document.getElementById("form-comment").value;
    var required = 8;
    var left = required - comment.length;
    if (left > 0) {
        commentError.innerHTML = left + " characters at least";
        return false;
    }
    commentError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}



function validateForm() {
    if (!validateComment()) {
        submitError.innerHTML = "PLease fix above error";
        setTimeout(function () { submitError.style.display = "none" }, 1000)
    } else {
        success.style.display = "block";
        setTimeout(function () { success.style.display = "none" }, 900)
        myComment();
    }
}



let comment = [];


let myComment = () => {
    comment.push({
        user_comment: cmnt.value
    });

    localStorage.setItem("userComments", JSON.stringify(comment));
    addC();
};



function addC() {
    var cmt = JSON.parse(localStorage.getItem("userComments"));
    console.log(cmt)
    let str = '';
    cmt.map(c => {

        let test = `
    <div>
    <div class="box six">
        <p>
        <h5>Jane Doe</h5>
        <p>${c.user_comment}</p>
        </p>
    </div> <br>
</div>`
        str += test;
    });

    theComment.innerHTML = str;
    resetForm();
}

let resetForm = () => {
    cmnt.value = "";
    commentError.innerHTML = "";
    submitError.innerHTML = "";
}