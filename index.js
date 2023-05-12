import { Modal } from 'bootstrap'


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

function counter(collection, id) {
  let counter = 0
  collection.forEach((item) => {
    counter += 1
    console.log(item)
  })
  id.innerHTML = counter;
  if (counter > 6) {
    alert('warning')
  }
}

//function openInTodo() { // добавлять карточку в окно todo
//  render(todos, rootElementTodo)
//  counter(todos, counterElementTodo)
//}

//function openInProgress() { // добавлять карточку в окно inProgress
//  render(todos, rootElementProgress)
//  counter(todos, counterElementProgress)
//}

//function openInDone() { // добавлять карточку в окно Done
//  render(todos, rootElementDone)
//  counter(todos, counterElementDone)
//}

// vars
const timeElement = $('.navbar__time')
const confirmButtonElement = $('#confirm')
const rootElement = $('#root')
const formsContainer = $('#formContainer')

let counterElementTodo = $('.card__counter')
let counterElementProgress = $('.card__counter-progress')
let counterElementDone = $('.card__counter-done')

let titleElement = $('#title')
let descriptioEnlement = $('#description')
let userElement = $('#user')
const elementsInTodo = $('#todo')
const elementsInProgress = $('#progress')
const elementsInDone = $('#done')
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
        <div class="data-title">${todo.title}</div>
        <div class="data-description">${todo.description}</div>
        <div class="data-user">${todo.user}</div>
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
  render(todos, elementsInTodo, elementsInProgress, elementsInDone)
  counter(todos, counterElementTodo)
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
  render(todos, elementsInTodo, elementsInProgress, elementsInDone)
}

// удалить карточку при нажатии на Remove
formsContainer.addEventListener('click', handleDeleteForm) // если карточка в окне Todo
function handleDeleteForm(event) {
  event.preventDefault()
  console.log('ok')
  const { target } = event;
  console.log(target)
  const { role, id } = target.dataset
  console.log(role)
  if (role == 'delete') {
    todos = todos.filter((item) => item.id != id)
    render(todos, elementsInTodo, elementsInProgress, elementsInDone)
    counter(todos, counterElementTodo)
    console.log(todos)
  }
}

// добавлять карточку в разные меню в зависимости от select

formsContainer.addEventListener('change', hanleSelect)

function hanleSelect(event) {
  event.preventDefault()
  console.log('ok progress')
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
    counter(todos, counterElementTodo)
    //counter(todos, counterElementProgress)
    //counter(todos, counterElementDone)
    console.log(todos)
  }
}

// удалить все окна
removeAll.addEventListener('click', handleremoveAll)
function handleremoveAll() {
  todos.length = ''
  render(todos, elementsInTodo, elementsInProgress, elementsInDone)
}
