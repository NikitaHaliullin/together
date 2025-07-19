window.onload = function () {
    let savedAuthorization = localStorage.getItem('authorization')
    let savedText = localStorage.getItem('chenge_text')
    let trust = localStorage.getItem('trust')

    if (trust) {
        let savedQuit = localStorage.getItem('quit')
        let savedApply = localStorage.getItem('apply')
        let savedRegistration_1 = localStorage.getItem('registration_1')
        document.getElementById('apply').style.display = savedApply
        document.getElementById('quit').style.display = savedQuit
        document.getElementById('registration').style.display = savedRegistration_1
        document.getElementById('authorization').style.border = savedAuthorization
        if (savedText) {
            document.getElementById('chenge_text').innerHTML = savedText
        }
    } else if (trust === false) {
        document.getElementById('apply').style.display = "block"
        document.getElementById('quit').style.display = "none"
        document.getElementById('registration').style.display = "block"

    }

}
let apply = document.getElementById('apply')
let email = document.getElementById('email')
let password = document.getElementById('password')
let authorization = document.getElementById('authorization')
let chenge_text = document.getElementById('chenge_text')
let quit = document.getElementById('quit')
let registration = document.getElementById('registration')
let emails = JSON.parse(localStorage.getItem('emails')) || []
let passwords = JSON.parse(localStorage.getItem('passwords')) || []
let trust = false

registration.style.display = localStorage.getItem('registration_1')
apply.style.display = trust == false ? "block" : "none"
quit.style.display = "none"

apply.addEventListener('click', function () {
    let email_value = email.value
    let password_value = password.value

    if (!emails.includes(email.value) || !passwords.includes(password.value)) {
        console.log(email.value)
        console.log(password.value)
        alert('Такого аккаунту не існує!')
    } else {
        if (password_value.length <= 10) {
            alert('Дуже короткий пароль');
            authorization.style.border = "3px solid #f00";

        } else if (!email_value.includes('@gmail.com') || email_value.length === 0) {
            alert('Це не є електронною адресою!')
            authorization.style.border = "3px solid #f00"

        } else {
            let check = confirm('Ви впевнені що це ваш аккаунт?')

            if (check) {
                trust = true
                true_autho = authorization.style.border = "3px solid #04a101"
                chenge_text.innerHTML = "Ви увійшли в аккаунт"
                registration.style.display = "none"
                quit.style.display = "block"
                apply.style.display = "none"

                localStorage.setItem('authorization', true_autho)
                localStorage.setItem('apply', apply.style.display)
                localStorage.setItem('registration_1', registration.style.display)
                localStorage.setItem('chenge_text', chenge_text.innerHTML)
                localStorage.setItem('trust', trust)
                localStorage.setItem('quit', quit.style.display)

            }
        }
    }
})

quit.addEventListener('click', function () {
    let check = confirm('Ви точно хочете вийти з аккаунту?')
    if (check) {
        trust = false
        email.value = ''
        password.value = ''
        chenge_text.innerHTML = "Увійдіть в аккаунт"
        true_autho = authorization.style.border = "3px solid #FF5B00"

        quit.style.display = "none"
        apply.style.display = "block"
        registration.style.display = "block"

        localStorage.setItem('trust', trust)
        localStorage.setItem('chenge_text', chenge_text.innerHTML)
        localStorage.setItem('authorization', true_autho)
        localStorage.setItem('quit', quit.style.display)
        localStorage.setItem('apply', apply.style.display)
        localStorage.setItem('registration_1', registration.style.display)
    }
})

