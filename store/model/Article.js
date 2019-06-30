class Article {
  constructor({ id, titleEn, titleJa, tags, abstractEn, abstractJa, publishedDate, createdAt, images, departments, writer }) {
    this.id = id
    this.titleEn = titleEn
    this.titleJa = titleJa
    this.tags = tags
    this.abstractEn = abstractEn
    this.abstractJa = abstractJa
    this.publishedDate = publishedDate
    this.createdAt = createdAt
    this.departments = departments
    this.images = images
    this.heading = Article.getHeading(abstractJa)
    this.writer = writer
  }

  static getHeading(abstractJa) {
    if (!abstractJa) return ''
    const paragraphs = abstractJa.content.filter(c => c.nodeType === 'paragraph')
    if (paragraphs.length === 0) return ''
    return paragraphs[0].content[0].value
  }
}

export default Article
