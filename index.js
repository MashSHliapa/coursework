import { Modal } from 'bootstrap'
import SimpleLightbox from 'simplelightbox'

// Module
const modalElement = document.querySelector('#exampleModal')

const modalInstance = Modal.getOrCreateInstance(modalElement)
console.log(modalInstance)

// modalInstance.show() // открыть модальное окно
// modalInstance.hide() // закрыть модальное окно

// Module Edit
const modalElementEdit = document.querySelector('#exampleModalEdit')

const modaEditInstance = Modal.getOrCreateInstance(modalElementEdit)
console.log(modaEditInstance)

// helpers
function $(selector) {
  return document.querySelector(selector)
}

function render(collection, wrapper, user = null) {
  let templates = ''
  collection.forEach((item) => {
    const template = buildTodoTemplate(item)
    templates += template
  })
  wrapper.innerHTML = templates
}

function counter(collection, id) {
  let counter = 0
  collection.forEach((item) => {
    counter += 1
    //console.log(item)
  })
  id.innerHTML = counter;
  if (counter > 6) {
    alert('warning')
  }
}

function openInTodo() { // добавлять карточку в окно todo
  render(todos, rootElementTodo)
  counter(todos, counterElementTodo)
}

// vars
const timeElement = $('.navbar__time')
const confirmButtonElement = $('#confirm')
const rootElement = $('#root')

let counterElementTodo = $('.card__counter')
let counterElementProgress = $('.card__counter-progress')
let counterElementDone = $('.card__counter-done')

let titleElement = $('#title')
let descriptioEnlement = $('#description')
let userElement = $('#user')
const rootElementTodo = $('#todo')
const rootElementProgress = $('#progress')
const rootElementDone = $('#done')
const removeAll = $('#remove')
// edit
const editElement = $('#editCard')
let titleElementEdit = $('#titleEdit')
let descriptioEnlementEdit = $('#descriptionEdit')
let userElementEdit = $('#userEdit')

// часы
window.onload = function () {
  window.setInterval(function () {
    let now = new Date();
    timeElement.innerHTML = now.toLocaleTimeString();
  }, 1000);
};

////////////////////////// todo
let todos = []
//let todosEdit = []

// constructor
function Todo(title, description, user) {
  this.id = Date.now()
  this.date = new Date().toLocaleDateString();
  this.title = title;
  this.description = description;
  this.user = user;
  //this.status = false
}

function buildTodoTemplate(todo) {
  return `
  <div class="todo">
    <div class="data">
      <div class="data-from-user">
        <div class="data-title">${todo.title}</div>
        <div class="data-description">${todo.description}</div>
        <div class="data-user">${todo.user}</div>
      </div>
      <div class="date">${todo.date}</div>
    </div>

    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" data-role="todo">Todo</button>
      <button type="button" class="btn btn-secondary" data-role="progress">In progress</button>
      <button type="button" class="btn btn-secondary" data-role="done">Done</button>
    </div>

    <select class="form-select" data-role="menu" aria-label="Default select example">
      <option value="1" data-role="todo">Todo</option>
      <option value="2" data-role="progress">In progress</option>
      <option value="3" data-role="done">Done</option>
    </select>
    <div class="btn-group" role="group" aria-label="example">
      <button type="button" data-role="edit" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalEdit">Edit</button>
      <button type="button" data-role="delete" data-id=${todo.id} class="btn btn-danger">Remove</button>
    </div>
  </div>
  `
}
// const confirmButtonElement = $('#confirm')
// handles
confirmButtonElement.addEventListener('click', handleAddForm)

//////////////////////////////////////////////////////////////////////////// TODO
// создать карточку
function handleAddForm(event) {
  event.preventDefault() // отменить действия браузера по-умолчанию
  const contentTitle = titleElement.value //чтобы выдало значение введенного текста
  const contentDescription = descriptioEnlement.value
  const contentUser = userElement.value
  const todo = new Todo(contentTitle, contentDescription, contentUser)
  todos.push(todo) // добавляем в массив todos
  console.log(todos)
  openInTodo()
}

editElement.addEventListener('click', handleOpenEditModal)
//Edit — открывает модальное окно для редактирование карточки

function handleOpenEditModal(event) {
  event.preventDefault()
  console.log('ok edit')
  const contentTitleEdit = titleElementEdit.value // редактируем все значения
  const contentDescriptionEdit = descriptioEnlementEdit.value
  const contentUserEdit = userElementEdit.value
  const todoEdit = new Todo(contentTitleEdit, contentDescriptionEdit, contentUserEdit) // создаем новый объект todoEdit
  todos.push(todoEdit); // добавляем новый объект в массив todos
  console.log(todos)
  const { target } = event;
  console.log(target)
  const { id } = target.dataset
  todos = todos.filter((item) => item.id == id)
  todos.splice(id, 1, todoEdit) // заменяем предыдущий объект в массиве (оставляем редактированный)
  console.log(todos)
  openInTodo() // открываем в окне todo
}

// удалить карточку при нажатии на Remove
rootElementTodo.addEventListener('click', handleDeleteForm) // если карточка в окне Todo
function handleDeleteForm(event) {
  console.log('ok')
  const { target } = event;
  console.log(target)
  const { role, id } = target.dataset
  console.log(role)
  if (role == 'delete') {
    todos = todos.filter((item) => item.id != id)
    openInTodo()
    console.log(todos)
  }
}
////////////////////////////////////////////////////////// IN PROGRESS

function openInProgress() { // добавлять карточку в окно inProgress
  render(todos, rootElementProgress)
  counter(todos, counterElementProgress)
  //todos.length = 0
  //console.log(todos)
  //openInTodo()

}
function openInDone() { // добавлять карточку в окно inProgress
  render(todos, rootElementDone)
  counter(todos, counterElementDone)
  //todos.length = 0
  //console.log(todos)
  //openInTodo()

}

// добавлять карточку в меню In progress из todo
// const rootElementTodo = $('#todo')
// const rootElementProgress = $('#progress')
rootElementTodo.addEventListener('click', hanleSelectProgress)

function hanleSelectProgress(event) {
  event.preventDefault()
  const { target } = event
  const { role, id } = target.dataset
  console.log(role)
  if (role == 'progress') {
    todos = todos.filter((item) => item.id != id)
    openInProgress()
    todos.length = 0
    openInTodo()
    console.log(todos)
    console.log(id)
  }
}

rootElementTodo.addEventListener('click', hanleSelectDone)

function hanleSelectDone(event) {
  event.preventDefault()
  const { target } = event
  const { role, id } = target.dataset
  console.log(role)
  if (role == 'done') {
    todos = todos.filter((item) => item.id != id)
    openInDone()
    todos.length = 0
    openInTodo()
    console.log(todos)
    console.log(id)
  }
}

// удалить все окна
removeAll.addEventListener('click', handleremoveAll)
function handleremoveAll() {
  console.log('delete')
  todos.length = ''
  openInTodo()
  openInProgress()
  openInDone()
}
