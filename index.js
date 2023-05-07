import { Modal } from 'bootstrap'
import SimpleLightbox from 'simplelightbox'

// Module
const modalElement = document.querySelector('#exampleModal')

const modalInstance = Modal.getOrCreateInstance(modalElement)
console.log(modalInstance)

// modalInstance.show() // открыть модальное окно
// modalInstance.hide() // закрыть модальное окно

// Lightbox
const lightboxInstance = new SimpleLightbox('.gallery a')

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
  //user.textcontent = user
}

function counter(collection, id) {
  let counter = 0
  collection.forEach((item) => {
    counter += 1
    console.log(item)
  })
  id.innerHTML = counter
}

// vars
const timeElement = $('.navbar__time')
const confirmButtonElement = $('#confirm')
const rootElement = $('#root')
let counterElement = $('.card__counter')
let titleElement = $('#title')
let descriptioEnlement =$('#description')
let userElement = $('#user')

// часы
window.onload = function () {
  window.setInterval(function () {
    let now = new Date();
    //var clock = document.getElementById("clock");
    timeElement.innerHTML = now.toLocaleTimeString();
  }, 1000);
};

////////////////////////// todo
let todos = []

// constructor

function Todo(title, description, user) {
  this.id = Date.now()
  this.date = new Date().toLocaleTimeString();
  this.title = title;
  this.description = description;
  this.user = user
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
    <select class="form-select" aria-label="Default select example">
      <option value="1">Todo</option>
      <option value="2">In progress</option>
      <option value="3">Done</option>
    </select>
    <div class="btn-group" role="group" aria-label="example">
      <button type="button" data-role="open" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
      <button type="button" data-role="delete" data-id="${todo.id}" class="btn btn-danger">Remove</button>
    </div>
  </div>
  `
}

// handles
confirmButtonElement.addEventListener('click', handleAddForm)

// создать карточку
function handleAddForm(event) {
  event.preventDefault() // отменить действия браузера по-умолчанию
  const contentTitle = titleElement.value //чтобы выдало значение введенного текста
  const contentDescription = descriptioEnlement.value
  const contentuser = userElement.value

  const todo = new Todo(contentTitle, contentDescription, contentuser)
  todos.push(todo) // добавляем в массив todos
  render(todos, rootElement)
  counter(todos, counterElement)
}

// удалить карточку при нажатии на Remove
rootElement.addEventListener('click', handleDeleteForm)
function handleDeleteForm(event) {
  console.log('ok')
  //const target = event.target;
  const { target } = event;
  console.log(target)
  const { role, id } = target.dataset
  console.log(role)
  if (role == 'delete') {
    todos = todos.filter((item) => item.id != id)
    render(todos, rootElement)
    counter(todos, counterElement)
  }
}

// Edit — открывает модальное окно для редактирование карточки
rootElement.addEventListener('click', handleOpenModal)
function handleOpenModal(event) {
  const { target } = event
  const { role } = target.dataset
  if (role == 'open') {
    const todo = new Todo(contentTitle, contentDescription, contentuser)
    todos.push(todo) // добавляем в массив todos
    confirmButtonElement.removeEventListener('click', handleAddForm)
  }
  render(todos, rootElement)

}
