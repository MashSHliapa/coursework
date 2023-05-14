import { Modal } from 'bootstrap'

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

// helpers
function $(selector) {
  return document.querySelector(selector)
}

function render(collection, wrapperTodo, wrapperInProgress, wrapperDone) {
  let todoPart = ''
  let progressPart = ''
  let donePart = ''
  collection.forEach((item) => {
    const template = buildTodoTemplate(item)
    if (item.status == 'todo') {
      todoPart += template;
    }
    if (item.status == 'inProgress') {
      progressPart += template;
    }
    if (item.status == 'done') {
      donePart += template;
    }
  })
  wrapperTodo.innerHTML = todoPart
  wrapperInProgress.innerHTML = progressPart
  wrapperDone.innerHTML = donePart
}

function counter(collection, conterTodo, counterInProgress, counterDone) {
  let countTodo = 0
  let countInProgres = 0
  let countDone = 0
  collection.forEach((item) => {
    if (item.status == 'todo') {
      countTodo += 1;
    }
    if (item.status == 'inProgress') {
      countInProgres += 1;
    }
    if (item.status == 'done') {
      countDone += 1;
    }
    console.log(item)
  })
  conterTodo.innerHTML = countTodo
  counterInProgress.innerHTML = countInProgres
  counterDone.innerHTML = countDone

  //const allowValues = [countTodo, countInProgres, countDone]
}

// vars
const timeElement = $('.navbar__time')
const confirmButtonElement = $('#confirm')
const formsContainer = $('#formContainer')

let counterElementTodo = $('.card__counter')
let counterElementInProgress = $('.card__counter-progress')
let counterElementDone = $('.card__counter-done')

let titleElement = $('#title')
let descriptioEnlement = $('#description')
let userElement = $('#user')
const modalTitle = $('.title')
const modalDescription = $('.description')
const elementsInTodo = $('#todo')

const elementsInProgress = $('#progress')
const elementsInDone = $('#done')
const removeAll = $('#cardRemove')

// edit
const buttonEditElement = $('#buttonEditCard')
let titleElementEdit = $('#titleEdit')
let descriptioEnlementEdit = $('#descriptionEdit')
let userElementEdit = $('#userEdit')
const modalTitleEdit = $('.titleEdit')
const modalDescriptionEdit = $('.descriptionEdit')

// часы
window.onload = function () {
  window.setInterval(function () {
    let now = new Date();
    timeElement.innerHTML = now.toLocaleTimeString();
  }, 1000);
};

let todos = []

// constructor
function Todo(title, description, user) {
  this.id = Date.now(),
    this.date = new Date().toLocaleDateString(),
    this.title = title,
    this.description = description,
    this.user = user,
    this.status = 'todo'
}

function buildTodoTemplate(todo) {
  const statusTodo = todo.status == 'todo' ? 'selected' : '';
  const statusInProgress = todo.status == 'inProgress' ? 'selected' : '';
  const statusDone = todo.status == 'done' ? 'selected' : '';
  return `
  <div class="todo" id=${todo.id}>
    <div class="data">
      <div class="data-from-user">
        <div class="data-title"><strong>Title:</strong> ${todo.title}</div>
        <div class="data-description"><strong>Description:</strong> ${todo.description}</div>
        <div class="data-user"><strong>${todo.user}</strong></div>
      </div>
      <div class="date">${todo.date}</div>
    </div>

    <select class="form-select" data-role="menu" aria-label data-id=${todo.id} ="Default select example">
      <option value="todo" ${statusTodo}>Todo</option>
      <option value="inProgress" ${statusInProgress}>In progress</option>
      <option value="done" ${statusDone}>Done</option>
    </select>

    <div class="btn-group" role="group" aria-label="example">
      <button type="button" data-role="edit" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalEdit">Edit</button>
      <button type="button" data-role="delete" data-id=${todo.id} class="btn btn-danger">Remove</button>
    </div>
  </div>
  `
}

// const confirmButtonElement = $('#confirm')
confirmButtonElement.addEventListener('click', handleAddForm)

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
}


//const editModalFormElement = $('#editModalForm')
//const userEdit = $('#userEdit')
//const buttonEditElement = $('#buttonEditCard')
//let titleElementEdit = $('#titleEdit')
//let descriptioEnlementEdit = $('#descriptionEdit')
//let userElementEdit = $('#userEdit')


buttonEditElement.addEventListener('click', handleOpenEditModal)
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
      if (item.id != id) {
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
formsContainer.addEventListener('click', handleDeleteForm) // если карточка в окне Todo
function handleDeleteForm(event) {
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

formsContainer.addEventListener('change', hanleSelect)

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
    console.log(id)
    render(todos, elementsInTodo, elementsInProgress, elementsInDone)
    counter(todos, counterElementTodo, counterElementInProgress, counterElementDone)
    console.log(todos)
  }

  // чтоб не более 6-ти карточек было в In progress
  if (role == 'menu' && target.value == "inProgress" && counterElementInProgress == 6) {
    alert('You can add only 6 cards In progress!')
  }
}

// удалить все окна
removeAll.addEventListener('click', handleremoveAll)
function handleremoveAll() {
  todos.length = ''
  render(todos, elementsInTodo, elementsInProgress, elementsInDone)
  counter(todos, counterElementTodo, counterElementInProgress, counterElementDone)
}
