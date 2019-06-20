class Article {
  constructor({ id, titleEn, titleJa, tags, abstractEn, abstractJa, publishedDate, createdAt, images, writer }) {
    this.id = id
    this.titleEn = titleEn
    this.titleJa = titleJa
    this.tags = tags
    this.abstractEn = abstractEn
    this.abstractJa = abstractJa
    this.publishedDate = publishedDate
    this.createdAt = createdAt
    this.images = images
    this.writer = (writer && (writer.fields.nameJa || writer.fields.handleName)) || ''
  }
}

export default Article
