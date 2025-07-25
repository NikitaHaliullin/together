//ПРИ ПОВТОРНОМУ ЗАПУСКУ ПРОГРАМИ АКТИВУЄТЬСЯ НАСТУПНИЙ КОД
window.onload = function () {
    if (localStorage.getItem('categories')) {
        categories = JSON.parse(localStorage.getItem('categories'))
        name_list = JSON.parse(localStorage.getItem('name_list'))
        sum_total = +localStorage.getItem('sum_total')
        cost_total = +localStorage.getItem('cost_total')
        earn_total = +localStorage.getItem('earn_total')
        new_sum_total = +localStorage.getItem('new_sum_total')
        new_earn_total = +localStorage.getItem('new_earn_total')
        new_cost_total = +localStorage.getItem('new_cost_total')
        check_currency_changed = localStorage.getItem('check_currency_changed') === 'true'
        symbol = localStorage.getItem('symbol') || '₴'

        sum_money.innerHTML = new_sum_total >= 0 ? `+${new_sum_total} ${symbol}` : `${new_sum_total} ${symbol}`
        cost_money.innerHTML = `-${new_cost_total} ${symbol}`
        earn_money.innerHTML = `+${new_earn_total} ${symbol}`

        for (let i = 0; i < name_list.length; i++) {
            let name = name_list[i]
            let value = check_currency_changed 
                ? Math.round(categories[name] / ( symbol == '$' ? 42 : symbol == '€' ? 48.6 : symbol == '¥' ? 5.7 : 1 ))
                : categories[name]
            

            let Earn_Cost = value >= 0
        
            let block = document.createElement('div')
            block.innerHTML = `
                <div style="display: flex; flex-direction: column">
                    <button class="delete">delete</button>
                    <div class="category">
                        <h3>${name}</h3>
                        <img src="${Earn_Cost ? 'image/earn_logo.png' : 'image/cost_logo.png'}" width="100px" height="100px">
                        <h2 id="${name}" style="color: ${Earn_Cost ? '#05930e' : '#ce381a'};">
                        ${Earn_Cost ? '+' : '-'}${Math.abs(value)} ${symbol}
                        </h2>
                    </div>
                </div>`

            
        
            let container = Earn_Cost ? insaid_earn : insaid_cost
            container.appendChild(block)

            block.querySelector('.delete').addEventListener('click', function() {
                let check = confirm('Ви точно хочете видалити цю категорію?')
                if (check) {
                    block.remove()

                    let value = categories[name]

                    if (Earn_Cost) {
                        earn_total -= value
                        sum_total -= value
                    } else {
                        cost_total -= value
                        sum_total -= value
                    }

                    new_earn_total = check_currency_changed 
                        ? Math.round(earn_total / (symbol == '$' ? 42 : symbol == '€' ? 48.6 : symbol == '¥' ? 5.7 : 1))
                        : earn_total
                    new_cost_total = check_currency_changed 
                        ? Math.round(Math.abs(cost_total) / (symbol == '$' ? 42 : symbol == '€' ? 48.6 : symbol == '¥' ? 5.7 : 1))
                        : Math.abs(cost_total)
                    new_sum_total = check_currency_changed 
                        ? Math.round(sum_total / (symbol == '$' ? 42 : symbol == '€' ? 48.6 : symbol == '¥' ? 5.7 : 1))
                        : sum_total

                    sum_money.innerHTML = new_sum_total >= 0 ? `+${new_sum_total} ${symbol}` : `${new_sum_total} ${symbol}`
                    earn_money.innerHTML = `+${new_earn_total} ${symbol}`
                    cost_money.innerHTML = `-${new_cost_total} ${symbol}`

                    name_list = name_list.filter(item => item !== name)
                    delete categories[name]

                    localStorage.setItem('categories', JSON.stringify(categories))
                    localStorage.setItem('name_list', JSON.stringify(name_list))
                    localStorage.setItem('sum_total', sum_total)
                    localStorage.setItem('cost_total', cost_total)
                    localStorage.setItem('earn_total', earn_total)
                    localStorage.setItem('new_sum_total', new_sum_total)
                    localStorage.setItem('new_earn_total', new_earn_total)
                    localStorage.setItem('new_cost_total', new_cost_total)
                    localStorage.setItem('symbol', symbol)
                    localStorage.setItem('check_currency_changed', check_currency_changed)
                }
            })
        }
    }
}
//localStorage.clear()
//ОТРИМАННЯ УСІХ ID З HTML
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
let currency_1 = document.getElementById('currency_1')
let currency_2 = document.getElementById('currency_2')
let currency_3 = document.getElementById('currency_3')
let currency_4 = document.getElementById('currency_4')
let symbols = document.getElementById('symbol')
let other = document.getElementById('other')
let img = document.getElementById('img')
let clear = document.getElementById('clear')
let money = document.getElementById('money')
let symbols_2 = document.getElementById('symbol_2')
let left_button = document.getElementById('left_button')


//СТВОРЕННЯ ЗМІННИХ
let symbol = localStorage.getItem('symbol') || '₴'
let trust = true
let button_trust = false
let currency_EUR_chenged = true
let currency_UAN_chenged = true
let currency_USD_chenged = true
let currency_CNY_chenged = true
let check_currency_changed = false
let change_earn = 0
let change_cost = 0
let name_list = []
let sum_category = 0
let general_sum = 0
let categories = {}
let earn_total = 0
let cost_total = 0
let sum_total = 0
let new_sum_total = 0
let new_earn_total = 0
let new_cost_total = 0
let symbol_chek = 0
symbols_2.style.display = "none"
cost_category_line.style.display = "none"

//ФУНКЦІЯ ДЛЯ ЗБЕРЕЖЕННЯ ДАННИХ КОРИСТУВАЧА
function storage() {
    localStorage.setItem('categories', JSON.stringify(categories))
    localStorage.setItem('name_list', JSON.stringify(name_list))
    localStorage.setItem('sum_total', sum_total)
    localStorage.setItem('cost_total', cost_total)
    localStorage.setItem('earn_total', earn_total)
    localStorage.setItem('new_sum_total', new_sum_total)
    localStorage.setItem('new_earn_total', new_earn_total)
    localStorage.setItem('new_cost_total', new_cost_total)
    localStorage.setItem('symbol', symbol)
    localStorage.setItem('check_currency_changed', check_currency_changed)
}

//ЗМІНА СТОРІНКИ З ЗАРОБІТКОМ НА СТОРІНКУ З ВИТРАТАМИ
cost_category.addEventListener('click', function () {
    cost_category_line.style.display = "block"
    earn_category_line.style.display = "none"
})

//ЗМІНА СТРОНІКИ З ВИТРАТАМИ НА СТОРІНКУ З ЗАРОБІТКОМ
earn_category.addEventListener('click', function () {
    cost_category_line.style.display = "none"
    earn_category_line.style.display = "block"
})

clear.addEventListener('click', function () {
    let check = confirm('Ви точно хочете очистити всі категорії?')
    if (check) {
         // Очистка localStorage
         localStorage.clear()

         // Очистка змінних
         categories = {}
         name_list = []
         sum_total = 0
         earn_total = 0
         cost_total = 0
         new_sum_total = 0
         new_earn_total = 0
         new_cost_total = 0
 
         // Очистка категорій
         insaid_earn.innerHTML = ''
         insaid_cost.innerHTML = ''
 
         // Оновлення тексту
         sum_money.innerHTML = `+0 ${symbol}`
         cost_money.innerHTML = `0 ${symbol}`
         earn_money.innerHTML = `+0 ${symbol}`
 
         // Повторне збереження
         storage()
    }
})

left_button.addEventListener('click', function () {
    
})

//ЯКЩО СТВОРЮЮТЬ КАТЕГОРІЮ З ВИТРАЧИНИМИ КОШТАМИ
cost_category_create.addEventListener('click', function () {
    check_currency_changed = localStorage.getItem('check_currency_changed') === 'true'
    symbol = localStorage.getItem('symbol') || '₴'
    let name = document.getElementById('name')
    let sum = document.getElementById('sum')
    let category_name = name.value
    let sum_category = sum.value

    if (category_name.length == 0 || sum_category.length == 0) {
        alert('Заповніть всі поля')
        trust = false
    } else {
        trust = true
    }

    let converted_sum_category = +sum_category;
    if (check_currency_changed) {
        if (symbol === '$') {
            converted_sum_category = Math.round(+sum_category * 42);
        } else if (symbol === '€') {
            converted_sum_category = Math.round(+sum_category * 48.6);
        } else if (symbol === '¥') {
            converted_sum_category = Math.round(+sum_category * 5.7);
        }
    }

    if (name_list.includes(category_name) && !insaid_earn.querySelector(`#${category_name}`)) {
        let true_category = categories[category_name]
        cost_total -= converted_sum_category
        sum_total -= converted_sum_category
        categories[category_name] -= converted_sum_category

        true_category = check_currency_changed 
            ? Math.round(categories[category_name] / ( symbol === '$' ? 42 : symbol === '€' ? 48.6 : symbol === '¥' ? 5.7 : 1 ))
            : true_category
        
        new_cost_total = check_currency_changed 
            ? Math.round(Math.abs(cost_total) / ( symbol === '$' ? 42 : symbol === '€' ? 48.6 : symbol === '¥' ? 5.7 : 1 ))
            : Math.abs(cost_total)

        new_sum_total = check_currency_changed 
            ? Math.round(sum_total / ( symbol === '$' ? 42 : symbol === '€' ? 48.6 : symbol === '¥' ? 5.7 : 1 ))
            : sum_total

        let Elem = document.getElementById(`${name.value}`)
        if (Elem) {Elem.innerHTML = `${true_category >= 0 ? '+' : '-'}${Math.abs(true_category)} ${symbol}`}

        cost_money.innerHTML = `-${new_cost_total} ${symbol}`
        sum_money.innerHTML = new_sum_total >= 0 ? `+${new_sum_total} ${symbol}` : `${new_sum_total} ${symbol}`
        storage()
    
    } else if (trust == true  && !insaid_earn.querySelector(`#${name.value}`)) {
        categories[category_name] = converted_sum_category * -1
        change_cost += 1
        let true_category = categories[category_name]  
        let id = `category_cost_${change_cost}`
        let converted_true_category = check_currency_changed 
            ? Math.round(true_category / ( symbol === '$' ? 42 : symbol === '€' ? 48.6 : symbol === '¥' ? 5.7 : 1 ))
            : true_category

        cost_total -= converted_sum_category
        sum_total -= converted_sum_category
        
        new_cost_total = check_currency_changed 
            ? Math.round(Math.abs(cost_total) / ( symbol === '$' ? 42 : symbol === '€' ? 48.6 : symbol === '¥' ? 5.7 : 1 ))
            : Math.abs(cost_total)
        new_sum_total = check_currency_changed 
            ? Math.round(sum_total / ( symbol === '$' ? 42 : symbol === '€' ? 48.6 : symbol === '¥' ? 5.7 : 1 ))
            : sum_total

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
                <img src="image/cost_logo.png" width="100px" height="100px">
                <h2 id="${name.value}" style="color: #ce381a;">${converted_true_category} ${symbol}</h2>
            </div>`

        cost_money.innerHTML = `-${new_cost_total} ${symbol}`
        sum_money.innerHTML = new_sum_total >= 0 ? `+${new_sum_total} ${symbol}` : `${new_sum_total} ${symbol}`
        storage()

        both_category.querySelector('.delete').addEventListener('click', function () {
            let check = confirm('Ви точно хочете видалити цю категорію?')
            if (check) {
                document.getElementById(id).remove()
        
                cost_total += Math.abs(categories[category_name])
                sum_total += Math.abs(categories[category_name])
        
                new_cost_total = check_currency_changed 
                    ? Math.round(Math.abs(cost_total) / (symbol === '$' ? 42 : symbol === '€' ? 48.6 : symbol === '¥' ? 5.7 : 1))
                    : Math.abs(cost_total)
        
                new_sum_total = check_currency_changed 
                    ? Math.round(sum_total / (symbol === '$' ? 42 : symbol === '€' ? 48.6 : symbol === '¥' ? 5.7 : 1))
                    : sum_total
        
                cost_money.innerHTML = `${new_cost_total} ${symbol}`
                sum_money.innerHTML = new_sum_total >= 0 ? `+${new_sum_total} ${symbol}` : `${new_sum_total} ${symbol}`
        
                name_list = name_list.filter(item => item !== category_name)
                delete categories[category_name]
                storage()
            }
        })

        insaid_cost.appendChild(both_category)
        name_list.push(name.value)

    } else (
        alert('Цю категорію неможна створити тут!')
    )

    name.value = ''
    sum.value = ''
    storage()
})

//ЯКЩО СТВОРЮЮТЬ КАТЕГОРІЮ З ОТРИМАНИМИ КОШТАМИ
earn_category_create.addEventListener('click', function () {
    check_currency_changed = localStorage.getItem('check_currency_changed') === 'true'
    symbol = localStorage.getItem('symbol') || '₴'
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

    let converted_sum_category = +sum_category;
    if (check_currency_changed) {
        if (symbol === '$') {
            converted_sum_category = Math.round(+sum_category * 42);
        } else if (symbol === '€') {
            converted_sum_category = Math.round(+sum_category * 48.6);
        } else if (symbol === '¥') {
            converted_sum_category = Math.round(+sum_category * 5.7);
        }
    }

    if (name_list.includes(name.value) && !insaid_cost.querySelector(`#${name.value}`)) {
        sum_total += converted_sum_category
        earn_total += converted_sum_category
        
        categories[category_name] += converted_sum_category

        let true_category = check_currency_changed 
            ? Math.round(categories[category_name] / ( symbol === '$' ? 42 : symbol === '€' ? 48.6 : symbol === '¥' ? 5.7 : 1 ))
            : categories[category_name]
            
        new_earn_total = check_currency_changed 
            ? Math.round(earn_total / ( symbol === '$' ? 42 : symbol === '€' ? 48.6 : symbol === '¥' ? 5.7 : 1 ))
            : earn_total
        new_sum_total = check_currency_changed 
            ? Math.round(sum_total / ( symbol === '$' ? 42 : symbol === '€' ? 48.6 : symbol === '¥' ? 5.7 : 1 ))
            : sum_total

        let Elem = document.getElementById(`${name.value}`)
        if (Elem) {Elem.innerHTML = `+${true_category} ${symbol}`}

        earn_money.innerHTML = `+${new_earn_total} ${symbol}`
        sum_money.innerHTML = new_sum_total >= 0 ? `+${new_sum_total} ${symbol}` : `${new_sum_total} ${symbol}`
        storage()
    
    } else if (trust == true && !insaid_cost.querySelector(`#${name.value}`)) {
        categories[category_name] = converted_sum_category
        change_earn += 1     
        let true_category = categories[category_name]  
        let id = `category_earn_${change_earn}`
        let converted_true_category = check_currency_changed 
            ? Math.round(true_category / ( symbol === '$' ? 42 : symbol === '€' ? 48.6 : symbol === '¥' ? 5.7 : 1 ))
            : true_category

        earn_total += categories[category_name]
        sum_total += categories[category_name]
        
        new_earn_total = check_currency_changed 
            ? Math.round(earn_total / ( symbol === '$' ? 42 : symbol === '€' ? 48.6 : symbol === '¥' ? 5.7 : 1 ))
            : earn_total
        new_sum_total = check_currency_changed 
            ? Math.round(sum_total / ( symbol === '$' ? 42 : symbol === '€' ? 48.6 : symbol === '¥' ? 5.7 : 1 ))
            : sum_total

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
                <img src="image/earn_logo.png" width="100px" height="100px">
                <h2 id="${name.value}" style="color: #05930e;">+${converted_true_category} ${symbol}</h2>
            </div>`
        
        earn_money.innerHTML = `+${new_earn_total} ${symbol}`
        sum_money.innerHTML = new_sum_total >= 0 ? `+${new_sum_total} ${symbol}` : `${new_sum_total} ${symbol}`
        storage()

        both_category.querySelector('.delete').addEventListener('click', function () {
            let check = confirm('Ви точно хочете видалити цю категорію?')
            if (check) {
                document.getElementById(id).remove()
        
                earn_total -= categories[category_name]
                sum_total -= categories[category_name]
        
                new_earn_total = check_currency_changed 
                    ? Math.round(earn_total / (symbol === '$' ? 42 : symbol === '€' ? 48.6 : symbol === '¥' ? 5.7 : 1))
                    : earn_total
                new_sum_total = check_currency_changed 
                    ? Math.round(sum_total / (symbol === '$' ? 42 : symbol === '€' ? 48.6 : symbol === '¥' ? 5.7 : 1))
                    : sum_total
        
                earn_money.innerHTML = `+${new_earn_total} ${symbol}`
                sum_money.innerHTML = new_sum_total >= 0 ? `+${new_sum_total} ${symbol}` : `${new_sum_total} ${symbol}`
        
                name_list = name_list.filter(item => item !== category_name)
                delete categories[category_name]
                storage()
            }
        })

        insaid_earn.appendChild(both_category)
        name_list.push(name.value)

    } else (
        alert('Цю категорію неможна створити тут!')
    )

    name.value = ''
    sum.value = ''
    storage()
})

// ПРИ НАЖАТТІ НА КНОПКУ ДЛЯ ЗМІНИ ВАЛЮТИ
symbols.addEventListener('click', function () {
    symbol_chek += 1
    if (symbol_chek % 2 != 0) {
        symbols_2.style.display = "flex"
        symbols_2.style.justifyContent = "center"
        symbols_2.style.paddingRight = "200px"
        symbols_2.style.paddingLeft = "200px"
    } else {
        symbols_2.style.display = "none"
        symbols_2.style.padding = "0% 0%"
    }
})

//ЗМІНА ВАЛЮТИ 
new_sum_total = sum_total
new_earn_total = earn_total
new_cost_total = cost_total

currency_1.addEventListener('click', function() {
    if (currency_USD_chenged) {
        symbol = '$'
        check_currency_changed = true
        new_sum_total = Math.round(sum_total / 42)
        new_earn_total = Math.round(earn_total / 42)
        new_cost_total = Math.round(Math.abs(cost_total) / 42)

        sum_money.innerHTML = new_sum_total >= 0 ? `+${new_sum_total} ${symbol}` : `${new_sum_total} ${symbol}`
        earn_money.innerHTML = `+${new_earn_total} ${symbol}`
        cost_money.innerHTML = `-${new_cost_total} ${symbol}`

        for (let i = 0; i < name_list.length; i++) {
            let plus_or_minus = categories[name_list[i]] >= 0
            let Elem = document.getElementById(`${name_list[i]}`)
            let new_category = Math.round(categories[name_list[i]] / 42) 
            Elem.innerHTML = `${plus_or_minus ? '+' : '-'}${Math.abs(new_category)} ${symbol}`
        }
    }   

    currency_EUR_chenged = true
    currency_UAN_chenged = true
    currency_CNY_chenged = true
    currency_USD_chenged = false
    storage()
})

currency_2.addEventListener('click', function() {
    if (currency_UAN_chenged) {
        symbol = '₴'
        check_currency_changed = false
        new_sum_total = Math.round(sum_total)
        new_earn_total = Math.round(earn_total)
        new_cost_total = Math.round(Math.abs(cost_total))

        sum_money.innerHTML = new_sum_total >= 0 ? `+${new_sum_total} ${symbol}` : `${new_sum_total} ${symbol}`
        earn_money.innerHTML = `+${new_earn_total} ${symbol}`
        cost_money.innerHTML = `-${new_cost_total} ${symbol}`

        for (let i = 0; i < name_list.length; i++) {
            let plus_or_minus = categories[name_list[i]] >= 0
            let Elem = document.getElementById(`${name_list[i]}`)
            let new_category = Math.round(categories[name_list[i]]) 
            Elem.innerHTML = `${plus_or_minus ? '+' : '-'}${Math.abs(new_category)} ${symbol}`
        }
    }
    currency_EUR_chenged = true
    currency_USD_chenged = true
    currency_CNY_chenged = true
    currency_UAN_chenged = false
    storage()
})

currency_3.addEventListener('click', function() {
    if (currency_EUR_chenged) {
        symbol = '€'
        check_currency_changed = true
        new_sum_total = Math.round(sum_total / 48.6)
        new_earn_total = Math.round(earn_total / 48.6)
        new_cost_total = Math.round(Math.abs(cost_total) / 48.6)

        sum_money.innerHTML = new_sum_total >= 0 ? `+${new_sum_total} ${symbol}` : `${new_sum_total} ${symbol}`
        earn_money.innerHTML = `+${new_earn_total} ${symbol}`
        cost_money.innerHTML = `-${new_cost_total} ${symbol}`

        for (let i = 0; i < name_list.length; i++) {
            let plus_or_minus = categories[name_list[i]] >= 0
            let Elem = document.getElementById(`${name_list[i]}`)
            let new_category = Math.round(categories[name_list[i]] / 48.6) 
            Elem.innerHTML = `${plus_or_minus ? '+' : '-'}${Math.abs(new_category)} ${symbol}`
        }
    }
    currency_USD_chenged = true
    currency_UAN_chenged = true
    currency_CNY_chenged = true
    currency_EUR_chenged = false
    storage()
})

currency_4.addEventListener('click', function() {
    if (currency_CNY_chenged) {
        symbol = '¥'
        check_currency_changed = true
        new_sum_total = Math.round(sum_total / 5.7)
        new_earn_total = Math.round(earn_total / 5.7)
        new_cost_total = Math.round(Math.abs(cost_total) / 5.7)

        sum_money.innerHTML = new_sum_total >= 0 ? `+${new_sum_total} ${symbol}` : `${new_sum_total} ${symbol}`
        earn_money.innerHTML = `+${new_earn_total} ${symbol}`
        cost_money.innerHTML = `-${new_cost_total} ${symbol}`

        for (let i = 0; i < name_list.length; i++) {
            let plus_or_minus = categories[name_list[i]] >= 0
            let Elem = document.getElementById(`${name_list[i]}`)
            let new_category = Math.round(categories[name_list[i]] / 5.7) 
            Elem.innerHTML = `${plus_or_minus ? '+' : '-'}${Math.abs(new_category)} ${symbol}`
        }
    }
    currency_USD_chenged = true
    currency_UAN_chenged = true
    currency_EUR_chenged = true
    currency_CNY_chenged = false
    storage()
})
