import Repository from './Repository'

const CONTENT_TYPE = 'article'
const IMAGE_CONTENT_TYPES = ['image/png', 'image/jpeg', 'image/gif']

export default {
  async fetchAll() {
    const res = await Repository.contentfulClient.getEntries({
      'content_type': CONTENT_TYPE,
      order: '-sys.createdAt'
    })
    const items = res.items
    return items.map((item) => {
      let images = []

      if (item.fields.abstractJa) {
        images = item.fields.abstractJa.content
          .filter(
            (c) => {
              return c.data.target && IMAGE_CONTENT_TYPES.includes(c.data.target.fields.file.contentType)
            }
          )
          .map(
            (image) => {
              return {
                url: `https:${image.data.target.fields.file.url}`,
                name: image.data.target.fields.title
              }
            }
          )
      }
      return {
        id: item.sys.id,
        titleEn: item.fields.titleEn,
        titleJa: item.fields.titleJa,
        tags: item.fields.tags,
        abstractEn: item.fields.abstractEn,
        abstractJa: item.fields.abstractJa,
        publishedDate: item.fields.publishedDate,
        createdAt: item.sys.createdAt,
        departments: item.fields.relatedDepartment || [],
        writer: (item.fields.writer) ? item.fields.writer.fields.handleName : '',
        images
      }
    })
  },
  async fetch({ slug }) {
    const res = await Repository.contentfulClient.getEntries({
      'sys.id': slug
    })
    const item = res.items[0]
    const abstractJa = item.fields.abstractJa
    let images = []
    if (abstractJa) {
      images = abstractJa.content
        .filter(
          (c) => {
            return c.data.target && IMAGE_CONTENT_TYPES.includes(c.data.target.fields.file.contentType)
          }
        )
        .map(
          (image) => {
            return {
              url: `https:${image.data.target.fields.file.url}`,
              name: image.data.target.fields.title
            }
          }
        )
    }
    const writer = item.fields.writer ? item.fields.writer.fields.handleName : ''
    const validator = item.fields.validator ? item.fields.validator.fields.handleName : ''
    const availability = item.fields.benchmark ? (item.fields.benchmark.filter(b => b.availability !== 'unavailable').length > 0 ? 'あり' : 'なし') : ''
    return {
      id: item.sys.id,
      article: item,
      titleJa: item.fields.titleJa || '',
      titleEn: item.fields.titleEn || '',
      createdAt: item.sys.createdAt || '',
      publishedDate: item.fields.publishedDate || '',
      abstractEn: item.fields.abstractEn || '',
      abstractJa: abstractJa || '',
      tags: item.fields.tag || [],
      articleURL: item.fields.linkToArticle || '',
      benchmark: item.fields.benchmark || '',
      departments: item.fields.relatedDepartment || '',
      images: images,
      writer: writer,
      validator: validator,
      availability: availability
    }
  }
}
