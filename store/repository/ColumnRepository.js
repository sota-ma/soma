import Repository from './Repository'

const CONTENT_TYPE = 'column'
const IMAGE_CONTENT_TYPES = ['image/png', 'image/jpeg', 'image/gif']

export default {
  fetchAll: async function () {
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
        title: item.fields.title,
        createdAt: item.sys.createdAt,
        document: item.fields.document,
        author: item.fields.author,
        validator: item.fields.validator,
        writer: (item.fields.author) ? item.fields.author.fields.handleName : '',
        images
      }
    })
  },
  async fetch({ slug }) {
    const res = await Repository.contentfulClient.getEntry(slug)
    return {
      id: res.sys.id,
      column: res,
      title: res.fields.title,
      createdAt: res.sys.createdAt,
      document: res.fields.document,
      tags: res.fields.tags,
      departments: res.fields.relatedDepartment
    }
  }
}
