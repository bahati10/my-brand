const divImg = document.querySelector('.profile-photo');   
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');

divImg.addEventListener('mouseenter', function () {
    uploadBtn.style.display = "block"
}) 

divImg.addEventListener('mouseleave', function () {
    uploadBtn.style.display = "none"
}) 