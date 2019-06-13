import Repository from './Repository'

const CONTENT_TYPE = 'column'

export default {
  async fetchAll() {
    const res = await Repository.contentfulClient.getEntries({
      'content_type': CONTENT_TYPE,
      order: '-sys.createdAt'
    })
    return res
  }
}
