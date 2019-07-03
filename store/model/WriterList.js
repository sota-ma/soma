import Writer from './Writer'

class WriterList {
  constructor(data) {
    if (data.length < 1) {
      throw new Error('invalid params for WriterList model')
    }
    this.list = data.map(d => new Writer({
      handleName: d.fields.handleName,
      institution: d.fields.institution,
      nameEn: d.fields.nameEn,
      nameJa: d.fields.nameJa
    }))
  }
}

export default WriterList
