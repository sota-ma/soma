class Article {
  constructor(props) {
    this.titleEn = props.fields.titleEn
    this.titleJa = props.fields.titleJa
    this.tags = props.fields.tags
    this.abstractEn = props.fields.abstractEn
    this.abstractJa = props.fields.abstractJa
    this.publishedDate = props.fields.publishedDate
    this.createdAt = props.sys.createdAt
  }
}

export default Article
