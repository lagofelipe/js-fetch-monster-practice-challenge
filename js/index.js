//page variable in there to assist with API method ...http://localhost:3000/monsters/?_limit=20&_page=3
let page = 1

document.addEventListener("DOMContentLoaded", function(e){
getMonsters(page)
 createMonsterForm()
 nextPage()
})

function getMonsters(page){
fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
.then(function(response){
    return response.json()
})
.then(function(obj){
    for(const monster of obj){
        createMonster(monster)
    }
})
}

function createMonster(monster){
    const container = document.querySelector('#monster-container')
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    h2.innerHTML = monster.name;
    const h4 = document.createElement('h4')
    h4.innerHTML = monster.age
    const p = document.createElement('p')
    p.innerHTML = monster.description
    div.append(h2, h4, p)
    container.append(div)
}

function createMonsterForm(){
target = document.querySelector('#create-monster')
form = document.createElement('form')

const nameField = document.createElement('input')
nameField.type = 'text'
nameField.placeholder = 'Name'
nameField.id = "monster-name"

const ageField = document.createElement('input')
ageField.type = 'text'
ageField.placeholder = 'Age'
ageField.id = "monster-age"

const descriptionField = document.createElement('input')
descriptionField.type = 'text'
descriptionField.placeholder = 'Description'
descriptionField.id = 'monster-description'

const submitBtn = document.createElement('button')
submitBtn.innerHTML = 'Create a new Monster'

target.append(form)
form.append(nameField,ageField, descriptionField, submitBtn )

form.addEventListener('submit', function(e){
e.preventDefault()
console.log('clicked')

const name = document.querySelector('#monster-name').value
const age = document.querySelector('#monster-age').value
const description = document.querySelector('#monster-description').value

const newMonster = {
name: name,
age: age,
description: description
}
createMonster(newMonster)

return fetch('http://localhost:3000/monsters', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
body: JSON.stringify({
    name: name,
    age: age,
    description: description
})
})
})
}

function nextPage(){
nextBtn = document.querySelector('#forward')

nextBtn.addEventListener('click', function(e){
page ++;

refresh = document.querySelector('monster-container')
refresh.innerHTML = null

fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
.then(function(response){
    return response.json()
})
 .then (function(obj){
     for (const monster of obj){
         createMonster(monster)
     }
})
})
}