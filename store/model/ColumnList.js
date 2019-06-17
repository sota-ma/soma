import Column from './Column'

class ColumnList {
  constructor(data) {
    if (data.length < 1) {
      throw new Error('invalid params for ColumnList model')
    }
    this.list = data.map(d => new Column({
      id: d.sys.id,
      createdAt: d.sys.createdAt,
      title: d.fields.title,
      document: d.fields.document,
      author: d.fields.author,
      validator: d.fields.validator
    }))
  }
}

export default ColumnList
