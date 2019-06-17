import Repository from './Repository'

const CONTENT_TYPE = 'article'

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
    return {
      id: item.sys.id,
      article: item,
      titleJa: item.fields.titleJa || '',
      titleEn: item.fields.titleEn || '',
      createdAt: item.sys.createdAt || '',
      publishedDate: item.fields.publishedDate || '',
      abstractEn: item.fields.abstractEn || '',
      abstractJa: item.fields.abstractJa || '',
      tags: item.fields.tag || [],
      articleURL: item.fields.linkToArticle || '',
      benchmark: item.fields.benchmark || '',
      departments: item.fields.relatedDepartment || '',
      images: []
    }
  }
}
