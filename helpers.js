import { buildTodoTemplate } from './template.js'
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
  let countInProgress = 0
  let countDone = 0
  collection.forEach((item) => {
    if (item.status == 'todo') {
      countTodo += 1;
    }
    if (item.status == 'inProgress') {
      countInProgress += 1;
    }
    if (item.status == 'done') {
      countDone += 1;
    }
    console.log(item)
  })
  conterTodo.innerHTML = countTodo
  counterInProgress.innerHTML = countInProgress
  counterDone.innerHTML = countDone
}

export { $, render, counter}
