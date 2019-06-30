import Column from './Column'

class ColumnList {
  constructor(data) {
    if (data.length < 1) {
      throw new Error('invalid params for ColumnList model')
    }
    this.list = data.map(d => new Column({
      id: d.id,
      createdAt: d.createdAt,
      title: d.title,
      document: d.document,
      author: d.author,
      validator: d.validator,
      writer: d.writer
    }))
  }
}

export default ColumnList
