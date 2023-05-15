// constructor
function Todo(title, description, user) {
  this.id = Date.now(),
    this.date = new Date().toLocaleDateString(),
    this.title = title,
    this.description = description,
    this.user = user,
    this.status = 'todo'
}
export { Todo }
