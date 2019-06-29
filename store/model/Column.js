class Column {
  constructor({ id, title, createdAt, document, author, validator, writer, publishedDate }) {
    this.id = id
    this.title = title
    this.createdAt = createdAt
    this.document = document
    this.author = author
    this.validator = validator
    this.writer = writer
    this.publishedDate = publishedDate
  }
}

export default Column
