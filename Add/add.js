var titleError = document.getElementById("title-error");
var subtitleError = document.getElementById("subtitle-error");
var contentError = document.getElementById("content-error");
var submitError = document.getElementById("submit-error");


function validateTitle() {
    var title = document.getElementById('form-title').value;
    localStorage.setItem("title", title);
    
    if(title.length < 30 || title.length < 0){
        titleError.innerHTML = 'Too short required';
        return false;
    }

    titleError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}


function validateDate() {
    var date = document.getElementById("form-date").value;
    localStorage.setItem("date", date)
}


function validateSubtitle(){
    var subtitle = document.getElementById("form-subtitle").value;
    localStorage.setItem("Subtitle", subtitle);
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
    localStorage.setItem("content", content);
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
    }

    alert("Message sent successfully.")
}