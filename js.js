window.onload = function () {
    if (localStorage.getItem('categories')) {
        categories = JSON.parse(localStorage.getItem('categories'))
        name_list = JSON.parse(localStorage.getItem('name_list'))
        sum_total = +localStorage.getItem('sum_total')
        cost_total = +localStorage.getItem('cost_total')
        earn_total = +localStorage.getItem('earn_total')

        sum_money.innerHTML = sum_total >= 0 ? `+${sum_total} ₴` : `${sum_total} ₴`
        cost_money.innerHTML = `-${cost_total} ₴`
        earn_money.innerHTML = `+${earn_total} ₴`

        for (let i = 0; i < name_list.length; i++) {
            let name = name_list[i]
            let value = categories[name]
            let Earn_Cost = value > 0
        
            let block = document.createElement('div')
            block.innerHTML = `
                <div style="display: flex; flex-direction: column">
                    <button class="delete">delete</button>
                    <div class="category">
                        <h3>${name}</h3>
                        <img src="image/ChatGPT Image May 31, 2025, 08_09_41 PM.png" width="70px" height="70px">
                        <h2 id="${name}" style="color: ${Earn_Cost ? '#05930e' : '#ce381a'};">
                            ${Math.abs(value)} ₴
                        </h2>
                    </div>
                </div>`
        
            let container = Earn_Cost ? insaid_earn : insaid_cost
            container.appendChild(block)

            block.querySelector('.delete').addEventListener('click', function() {
                let check = confirm('Ви точно хочете видалити цю категорію?')
                if (check) {
                    block.remove()

                    if (Earn_Cost) {
                        sum_total -= value
                        earn_total -= value
                        earn_money.innerHTML = `+${earn_total} ₴`
                    } else {
                        sum_total -= value
                        cost_total += value
                        cost_money.innerHTML = `-${cost_total} ₴`

                    }
                    sum_money.innerHTML = sum_total >= 0 ? `+${sum_total} ₴` : `${sum_total} ₴`
                    delete categories[name]

                    localStorage.setItem('categories', JSON.stringify(categories))
                    localStorage.setItem('name_list', JSON.stringify(name_list))
                    localStorage.setItem('sum_total', sum_total)
                    localStorage.setItem('cost_total', cost_total)
                    localStorage.setItem('earn_total', earn_total)
                }
            })
        }
    }
}

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
let button_trust = false
let change_earn = 0
let change_cost = 0
cost_category_line.style.display = "none"
let name_list = []
let sum_category = 0
let general_sum = 0
let categories = {}
let earn_total = 0
let cost_total = 0
let sum_total = 0

function storage() {
    localStorage.setItem('categories', JSON.stringify(categories))
    localStorage.setItem('name_list', JSON.stringify(name_list))
    localStorage.setItem('sum_total', sum_total)
    localStorage.setItem('cost_total', cost_total)
    localStorage.setItem('earn_total', earn_total)
}

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
    let category_name = name.value
    let sum_category = sum.value

    if (name.value.length == 0 || sum.value.length == 0) {

        alert('Заповніть всі поля')
        trust = false

    } else {
        trust = true
    }

    if (name_list.includes(name.value) && !insaid_earn.querySelector(`#${name.value}`)) {
        categories[name.value] -= (+sum.value)
        console.log(categories[name.value])
        cost_total -= (+sum_category)
        sum_total -= (+sum_category)
        cost_money.innerHTML = `${cost_total} ₴`
    
        let Elem = document.getElementById(`${name.value}`)
        if (Elem) {Elem.innerHTML = `${categories[name.value]} ₴`}
        storage()
    
    } else if (trust == true  && !insaid_earn.querySelector(`#${name.value}`)) {
        categories[name.value] = (+sum.value)
        categories[name.value] = categories[name.value] * -1
        change_cost += 1
        let id = `category_cost_${change_cost}`

        let both_category = document.createElement('div')
        both_category.id = id
        both_category.style.display = "flex"
        both_category.style.flexDirection = "column"
        both_category.innerHTML = `
            <button class="delete">
                delete
            </button>
            <div class="category">
                <h3>${name.value}</h3>
                <img src="image/ChatGPT Image May 31, 2025, 08_09_41 PM.png" width="70px" height="70px">
                <h2 id="${name.value}" style="color: #ce381a;">${categories[name.value]} ₴</h2>
            </div>`

        cost_total -= (+sum_category)
        sum_total -= (+sum_category)
        cost_money.innerHTML = `${cost_total} ₴`
        storage()

        both_category.querySelector('.delete').addEventListener('click', function () {
            let check = confirm('Ви точно хочете видалити цю категорію?')
            if (check == true) {
                document.getElementById(id).remove()

                cost_total -= categories[category_name]
                sum_total -= categories[category_name]
                sum_money.innerHTML = `${sum_total} ₴`
                cost_money.innerHTML = `${cost_total} ₴`
                name_list = name_list.filter(item => item !== category_name)
                storage()
            }
        })

        insaid_cost.appendChild(both_category)
    } else (
        alert('Цю категорію неможна створити тут!')
    )

    name_list.push(name.value)

    name.value = ''
    sum.value = ''
    storage()

    if (sum_total < 0) {
        sum_money.innerHTML = `${sum_total} ₴`
        storage()
    } else {
        sum_money.innerHTML = `+${sum_total} ₴`
        storage()
    }

    localStorage.setItem('categories', JSON.stringify(categories))
    localStorage.setItem('name_list', JSON.stringify(name_list))
    localStorage.setItem('sum_total', sum_total)
    localStorage.setItem('cost_total', cost_total)
    localStorage.setItem('earn_total', earn_total)

})

earn_category_create.addEventListener('click', function () {
    let name = document.getElementById('name')
    let sum = document.getElementById('sum')
    let category_name = name.value
    sum_category = sum.value

    if (name.value.length == 0 || sum.value.length == 0) {

        alert('Заповніть всі поля')
        trust = false

    } else {
        trust = true
    }

    if (name_list.includes(name.value) && !insaid_cost.querySelector(`#${name.value}`)) {
        categories[name.value] += (+sum.value)
        earn_total += (+sum_category)
        sum_total += (+sum_category)
        earn_money.innerHTML = `+${earn_total} ₴`
    
        let Elem = document.getElementById(`${name.value}`)
        if (Elem) {Elem.innerHTML = `+${categories[name.value]} ₴`}
        storage()
    
    } else if (trust == true && !insaid_cost.querySelector(`#${name.value}`)) {
        categories[name.value] = (+sum.value)  
        change_earn += 1     
        let id = `category_earn_${change_earn}`

        let both_category = document.createElement('div')
        both_category.id = id
        both_category.style.display = "flex"
        both_category.style.flexDirection = "column"
        both_category.innerHTML = `
            <div class="delete">
                delete
            </div>
            <div class="category">
                <h3>${name.value}</h3>
                <img src="image/ChatGPT Image May 31, 2025, 08_09_41 PM.png" width="70px" height="70px">
                <h2 id="${name.value}" style="color: #05930e;">+${categories[name.value]} ₴</h2>
            </div>`

        earn_total += (+sum_category)
        sum_total += (+sum_category)
        earn_money.innerHTML = `+${earn_total} ₴`
        storage()

        both_category.querySelector('.delete').addEventListener('click', function () {
            let check = confirm('Ви точно хочете видалити цю категорію?')
            if (check == true) {
                document.getElementById(id).remove()

                earn_total -= categories[category_name]
                sum_total -= categories[category_name]
                earn_money.innerHTML = `+${earn_total} ₴`
                sum_money.innerHTML = `${sum_total} ₴`
                name_list = name_list.filter(item => item !== category_name)
                storage()
            }
        })

        insaid_earn.appendChild(both_category)

    } else (
        alert('Цю категорію неможна створити тут!')
    )

    name_list.push(name.value)

    name.value = ''
    sum.value = ''
    storage()

    if (sum_total > 0) {
        sum_money.innerHTML = `+${sum_total} ₴`
        storage()
    } else {
        sum_money.innerHTML = `${sum_total} ₴`
        storage()
    }
    localStorage.setItem('categories', JSON.stringify(categories))
    localStorage.setItem('name_list', JSON.stringify(name_list))
    localStorage.setItem('sum_total', sum_total)
    localStorage.setItem('cost_total', cost_total)
    localStorage.setItem('earn_total', earn_total)
})


    } else {
        sum.money.innerHTML = `-${sum_total} ₴`
    }
})
