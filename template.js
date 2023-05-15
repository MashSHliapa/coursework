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

export { buildTodoTemplate }
