
let apply = document.getElementById('apply')
let email = document.getElementById('email')
let password = document.getElementById('password')
let registration_ak = document.getElementById('registration_ak')
let chenge_text_2 = document.getElementById('chenge_text_2')
let registration = document.getElementById('registration')

let emails = JSON.parse(localStorage.getItem('emails')) || []
let passwords = JSON.parse(localStorage.getItem('passwords')) || []
console.log(emails)
console.log(passwords)
let trust = false

apply.addEventListener('click', function () {
    let email_value = email.value
    let password_value = password.value

    if (password_value.length <= 10) {
        alert('Дуже короткий пароль');
        registration_ak.style.border = "3px solid #f00";

    } else if (!email_value.includes('@gmail.com') || email_value.length === 0) {
        alert('Це не є електронною адресою!')
        registration_ak.style.border = "3px solid #f00"

    } else {
        trust = true
        emails.push(email_value)
        passwords.push(password_value)
        true_autho = registration_ak.style.border = "3px solid #04a101"
        chenge_text_2.innerHTML = "Ви успішно створили аккаунт"

        localStorage.setItem('registration', true_autho)
        localStorage.setItem('chenge_text_2', chenge_text_2.innerHTML)
        localStorage.setItem('trust_2', trust)
        localStorage.setItem('emails', JSON.stringify(emails))
        localStorage.setItem('passwords', JSON.stringify(passwords))
    }
})

