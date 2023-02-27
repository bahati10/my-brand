const logOut = document.querySelector(".signup");

window.onload = event => {
    getContent();
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


const getContent = async () => {
    axios.get("https://api.bahatiyves.com/api/blogs")
        .catch((error) => {
            console.log(error)
        })
        .then((data) => {
            let container = document.querySelector(".container");
            blog = data.data.data;
            let str = '';
            test = blog.map(item => {
                let add = ` 
            <div class="box one">
            <div class="content">
                <h5>${item.title}<span></h5> <br></h5>
                <p>
                </p> <br>
                <p>
                </p>

                <p id="sub">
                </p> <br> <br>

                <p>${item.content}
                </p>
            </div>
        </div>
        <div class="box two">
            <div class="image">
                <img src="${item.image}" alt="${item.title}" width="400" height="330"
                    title="UI/UX Design">
            </div>
        </div>
        <div class="box three">
            <button class="like"><i class="fa-solid fa-heart"></i> Like</button>
            <a href="#main-container" id="comment"><button class="comment"><i class="fa-solid fa-message"></i>
                    Comment</button></a>
        </div> <br>
        <div class="comment-container">

        </div>
        <div class="main-container" id="main-container">
            <form class="form" autocomplete="on" >
                <h2>Add Comment</h2>
                <label class="message" for="text">Comment</label>
                <textarea name="message" id="form-comment" maxlength="30" cols="30" rows="5"
                    onkeyup="validateComment()"></textarea> <br>
                <span id="comment-error"></span> <br> <br>
                <button class="send" type="submit" onclick="return validateForm()">post</button>
                <span id="submit-error"></span>
            </form>
            <id id="success">
                <div class="modal">
                    <div class="icon"><i id="icon1" class="fa-regular fa-circle-check"></i></div>
                    <h4>Comment Added<br> Successfully</h4>
                </div>
            </id>
        </div>
            
            `
                str += add;
            })
            container.innerHTML = str;
        })
        .catch((error) => error);
}
