var commentError = document.getElementById("comment-error");
var submitError = document.getElementById("submit-error");


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
        setTimeout(function() {submitError.style.display = "none"}, 2000)
        return false;
    }

    alert("Comment Added Successfully")
}