const formOpenBtn = document.querySelector("#form-open"),
home = document.querySelector(".home"),
formContainer = document.querySelector(".form_container"),
formCloseBtn = document.querySelector(".form-close"),
signupBtn = document.querySelector("#signup"),
loginBtn = document.querySelector("#login"),
pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener('click', () => home.classList.add("show"));
formCloseBtn.addEventListener('click', () => home.classList.remove("show"));

signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    formContainer.classList.add("active");
})

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    formContainer.classList.remove("active");
})

pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
        let pwGetInput = icon.parentElement.querySelector("input");
        if(pwGetInput.type === "password"){
            pwGetInput.type = "text";
            icon.classList.replace("fa-eye-slash", "fa-eye");
        }
        else{
            pwGetInput.type = "password";
            icon.classList.replace("fa-eye", "fa-eye-slash");
        }
    });
});