class ColumnDetail {
  constructor({ id, title, tag, tags, createdAt, document, departments, writer, validator }) {
    this.id = id
    this.title = title
    this.tag = tag
    this.tags = tags
    this.createdAt = createdAt
    this.document = document
    this.departments = departments
    this.writer = writer
    this.validator = validator
  }
}

export default ColumnDetail
