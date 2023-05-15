// constructor
//function Todo(title, description, user) {
//  this.id = crypto.randomUUID(),
//    this.date = new Date().toLocaleDateString(),
//    this.title = title,
//    this.description = description,
//    this.user = user,
//    this.status = 'todo'
//}
//export { Todo }

class Todo {
  id = crypto.randomUUID()
  date = new Date().toLocaleDateString()
  status = 'todo'

  constructor (title, description, user) {
    this.title = title
    this.description = description
    this.user = user
  }
}

export { Todo }
