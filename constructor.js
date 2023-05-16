
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
