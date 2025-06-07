let sum_money = document.getElementById('sum_money')
let cost_money = document.getElementById('cost_money')
let earn_money = document.getElementById('earn_money')
let earn_category = document.getElementById('earn_category')
let cost_category = document.getElementById('cost_category')
let earn_category_line = document.getElementById('earn_category_line')
let cost_category_line = document.getElementById('cost_category_line')
let all_category = document.getElementById('all_category')
let name_category = document.getElementById('name_category')
let earn_category_create = document.getElementById('earn_category_create')
let cost_category_create = document.getElementById('cost_category_create')
let insaid_earn = document.getElementById('insaid_earn')
let insaid_cost = document.getElementById('insaid_cost')
let img = document.getElementById('img')
let money = document.getElementById('money')

let trust = true
cost_category_line.style.display = "none"
let name_list = []
let sum_category = 0
let general_sum = 0
let categories = {}

cost_category.addEventListener('click', function () {
    cost_category_line.style.display = "block"
    earn_category_line.style.display = "none"
})

earn_category.addEventListener('click', function () {
    cost_category_line.style.display = "none"
    earn_category_line.style.display = "block"
})

cost_category_create.addEventListener('click', function () {
    let name = document.getElementById('name')
    let sum = document.getElementById('sum')

})

earn_category_create.addEventListener('click', function () {
    let name = document.getElementById('name')
    let sum = document.getElementById('sum')
    sum_category = sum.value
    console.log(name.value)

    if (name.value.length == 0 || sum.value.length == 0) {
        alert('Заповніть всі поля')
        trust = false

    } else {
        trust = true
    }

    if (trust == true && !name_list.includes(name.value)) {
        let category = document.createElement('div')
        category.classList.add('category')
        category.innerHTML = `
            <h3>${name.value}</h3>
            <img src="image/ChatGPT Image May 31, 2025, 08_09_41 PM.png" width="70px" height="70px">
            <h2 style="color: #05930e;">+${sum.value} ₴</h2>
        `  
        
        categories[name.value] = sum.value

        console.log(categories)
        insaid_earn.appendChild(category)
    
    } 
    if (name_list.includes(name.value)) {
        sum.value = (+sum.value) + (+sum_category)
        general_sum = sum.value
        console.log(general_sum)
    }

    name_list.push(name.value)

    name.value = ''
    sum.value = ''
})
