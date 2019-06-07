class Writer {
  constructor({ handleName, institution, nameEn, nameJa }) {
    if (!handleName || !institution || !nameEn || !nameJa) {
      throw new Error('invalid params for writer model: ' + JSON.stringify({ handleName, institution, nameEn, nameJa }))
    }
    this.handleName = handleName
    this.institution = institution
    this.nameEn = nameEn
    this.nameJa = nameJa
  }

  jaTitle() {
    return this.nameJa + 'さん'
  }
}

export default Writer
