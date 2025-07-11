window.onload = function () {
    let savedAuthorization = localStorage.getItem('authorization');
    document.getElementById('authorization').style.border = savedAuthorization
    let savedText = localStorage.getItem('chenge_text');
    if (savedText) {
        document.getElementById('chenge_text').innerHTML = savedText;
    }
}

let apply = document.getElementById('apply');
let email = document.getElementById('email');
let password = document.getElementById('password');
let authorization = document.getElementById('authorization');
let chenge_text = document.getElementById('chenge_text');

apply.addEventListener('click', function () {
    let email_value = email.value;
    let password_value = password.value;

    if (password_value.length <= 10) {
        alert('Дуже короткий пароль');
        authorization.style.border = "3px solid #f00";
    } else if (!email_value.includes('@gmail.com') || email_value.length === 0) {
        alert('Це не є електронною адресою!');
        authorization.style.border = "3px solid #f00";
    } else {
        let check = confirm('Ви впевнені що це ваш аккаунт?');
        if (check) {
            true_autho = authorization.style.border = "3px solid #04a101";
            chenge_text.innerHTML = "Ви увійшли в аккаунт";
            console.log(true_autho)

            localStorage.setItem('authorization', true_autho);
            localStorage.setItem('chenge_text', chenge_text.innerHTML);
        }
    }
});
