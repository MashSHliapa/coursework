import { Modal } from 'bootstrap'
import { $, render, counter } from './helpers.js'
import { Todo } from './constructor.js'

// Module
const modalElement = document.querySelector('#exampleModal')
const modalInstance = Modal.getOrCreateInstance(modalElement)
//console.log(modalInstance)

// modalInstance.show() // открыть модальное окно
// modalInstance.hide() // закрыть модальное окно

// Module Edit
const modalElementEdit = document.querySelector('#exampleModalEdit')
const modaEditInstance = Modal.getOrCreateInstance(modalElementEdit)
//console.log(modaEditInstance)

// Module remove
const modalElementRemove = document.querySelector('#exampleModalRemove')
const modaRemoveInstance = Modal.getOrCreateInstance(modalElementRemove)
//console.log(modaRemoveInstance)

// Modal counter In progress
const modalElementCounter = document.querySelector('#exampleModalCounter')
const modaCounterInstance = Modal.getOrCreateInstance(modalElementCounter)
console.log(modaCounterInstance)


// vars
const timeElement = $('.navbar__time')
const confirmButtonElement = $('#confirm')
const formsContainer = $('#formContainer')

let counterElementTodo = $('.card__counter')
let counterElementInProgress = $('.card__counter-progress')
let counterElementDone = $('.card__counter-done')

let titleElement = $('#title')
let descriptioEnlement = $('#description')
let userElement = $('#userSelect')
const modalTitle = $('.title')
const modalDescription = $('.description')
const elementsInTodo = $('#todo')

const elementsInProgress = $('#progress')
const elementsInDone = $('#done')
const removeAll = $('#cardRemove')

const buttonEditElement = $('#buttonEditCard')
let titleElementEdit = $('#titleEdit')
let descriptioEnlementEdit = $('#descriptionEdit')
let userElementEdit = $('#userSelectEdit')
const modalTitleEdit = $('.titleEdit')
const modalDescriptionEdit = $('.descriptionEdit')


// handles
confirmButtonElement.addEventListener('click', handleAddForm)
buttonEditElement.addEventListener('click', handleOpenEditModal) //Edit — открывает модальное окно для редактирование карточки
formsContainer.addEventListener('change', hanleSelect) // добавлять карточку в разные меню в зависимости от select
formsContainer.addEventListener('click', handleRemoveForm) // удалить карточку при нажатии на Remove
removeAll.addEventListener('click', handleRemoveAll) // удалить все карточки


// часы
window.onload = function () {
  window.setInterval(function () {
    let now = new Date();
    timeElement.innerHTML = now.toLocaleTimeString();
  }, 1000);
};

let todos = []

// создать карточку
function handleAddForm(event) {
  event.preventDefault() // отменить действия браузера по-умолчанию
  const contentTitle = titleElement.value //чтобы выдало значение введенного текста
  const contentDescription = descriptioEnlement.value
  const contentUser = userElement.value
  const todo = new Todo(contentTitle, contentDescription, contentUser)
  todos.push(todo) // добавляем в массив todos
  console.log(todos)
  render(todos, elementsInTodo, elementsInProgress, elementsInDone)
  counter(todos, counterElementTodo, counterElementInProgress, counterElementDone)
  modalTitle.reset() // чтоб удалить содержимое title
  modalDescription.reset() // чтоб удалить содержимое description
  setData()
}

//Edit — открывает модальное окно для редактирование карточки
function handleOpenEditModal(event) {
  event.preventDefault()
  console.log('ok edit')
  const { target } = event;
  console.log(target)
  const { id, role } = target.dataset
  console.log(role)

  const contentTitleEdit = titleElementEdit.value // редактируем все значения
  const contentDescriptionEdit = descriptioEnlementEdit.value
  const contentUserEdit = userElementEdit.value

  //userElement.replaceWith(contentTitleEdit)
  //const todo = new Todo(contentTitleEdit, contentDescriptionEdit, contentUserEdit)
  //todos.push(todo)

  if (role == 'editCard') {
    todos.forEach((item) => {
      if (item.id == id) {
        item.title = contentTitleEdit
        item.user = contentUserEdit
        item.description = contentDescriptionEdit
      }
      console.log(item)
    })
  }

  todos = todos.filter((item) => item.id != id)
  console.log(todos)
  render(todos, elementsInTodo, elementsInProgress, elementsInDone)
  counter(todos, counterElementTodo, counterElementInProgress, counterElementDone)
  modalTitleEdit.reset()
  modalDescriptionEdit.reset()
}

// удалить карточку при нажатии на Remove
function handleRemoveForm(event) {
  event.preventDefault()
  const { target } = event;
  const { role, id } = target.dataset
  if (role == 'delete') {
    todos = todos.filter((item) => item.id != id)
    render(todos, elementsInTodo, elementsInProgress, elementsInDone)
    counter(todos, counterElementTodo, counterElementInProgress, counterElementDone)
    console.log(todos)
  }
}

// добавлять карточку в разные меню в зависимости от select
function hanleSelect(event) {
  event.preventDefault()
  const { target } = event
  const { role, id } = target.dataset
  console.log(role)
  if (role == 'menu') {
    todos.forEach((item) => {
      if (item.id == id) {
        item.status = target.value
      }
    })

    // чтоб не более 6-ти карточек было в In progress
    let countInProgressCard = 0
    todos.forEach((item) => {
      if (item.status == 'inProgress') {
        countInProgressCard += 1
      }
    })
    if (role == 'menu' && target.value == 'inProgress' && countInProgressCard > 6) {
      //alert('You can add only 6 cards In progress!')
      modaCounterInstance.show()
      todos = todos.filter((item) => item.id != id)
    }
    console.log(id)
    render(todos, elementsInTodo, elementsInProgress, elementsInDone)
    counter(todos, counterElementTodo, counterElementInProgress, counterElementDone)
    console.log(todos)
  }
}

// удалить все окна
function handleRemoveAll() {
  todos.length = ''
  render(todos, elementsInTodo, elementsInProgress, elementsInDone)
  counter(todos, counterElementTodo, counterElementInProgress, counterElementDone)
}

getData ()
// localStorage
function setData() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getData () {
  const savedUser = JSON.parse(localStorage.getItem('todos')) // возврвщает опять в объект
  console.log(savedUser)
}

/// стягиваем пользоватей с JSON placeholder API
const url = 'https://jsonplaceholder.typicode.com/users'

async function getTodos () {
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
  return data
}

function printTodos (data) {
  userElement.innerHTML = ''
  data.forEach((item) => {
    userElement.innerHTML += `<option value="${item.name}">${item.name}</option>`
    userElementEdit.innerHTML += `<option value="${item.name}">${item.name}</option>`
  })
}

;(async () => {
  const data = await getTodos()
  printTodos(data)
})()
