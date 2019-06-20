class ArticleDetail {
  constructor({ id, titleJa, titleEn, createdAt, publishedDate, abstractEn, abstractJa, tags, articleURL, benchmark, departments, images, writer, validator, availability }) {
    this.id = id
    this.titleJa = titleJa
    this.titleEn = titleEn
    this.createdAt = createdAt
    this.publishedDate = publishedDate
    this.abstractEn = abstractEn
    this.abstractJa = abstractJa
    this.tags = tags
    this.articleURL = articleURL
    this.benchmark = benchmark
    this.departments = departments
    this.images = images
    this.writer = writer
    this.validator = validator
    this.availability = availability
  }
}

export default ArticleDetail
