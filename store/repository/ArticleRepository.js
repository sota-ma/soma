import Repository from './Repository'

const CONTENT_TYPE = 'article'
const IMAGE_CONTENT_TYPES = ['image/png', 'image/jpeg', 'image/gif']

export default {
  async fetchAll() {
    const res = await Repository.contentfulClient.getEntries({
      'content_type': CONTENT_TYPE,
      order: '-sys.createdAt'
    })
    return res
  },
  async fetch({ slug }) {
    const res = await Repository.contentfulClient.getEntries({
      'sys.id': slug
    })
    const item = res.items[0]
    const abstractJa = item.fields.abstractJa
    const images = abstractJa.content
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
      images: images
    }
  }
}
