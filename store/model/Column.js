class Column {
  constructor({ id, title, createdAt, document, author, validator }) {
    this.id = id
    this.title = title
    this.createdAt = createdAt
    this.document = document
    this.author = author
    this.validator = validator
  }
}

export default Column
