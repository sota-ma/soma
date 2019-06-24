class Article {
  constructor({ id, titleEn, titleJa, tags, abstractEn, abstractJa, publishedDate, createdAt, images, departments }) {
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
  }
}

export default Article
