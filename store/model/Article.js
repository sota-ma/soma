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
    const paragraphs = abstractJa.content.filter(c => c.nodeType === 'paragraph' || c.nodeType === 'unordered-list')
    if (paragraphs.length === 0) return ''
    if (paragraphs[0].nodeType === 'paragraph') {
      return paragraphs[0].content[0].value
    } else if (paragraphs[0].nodeType === 'unordered-list') {
      return paragraphs[0].content[0].content[0].content[0].value
    }
    return ''
  }
}

export default Article
