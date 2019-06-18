import contentful from '~/plugins/contentful'
const client = contentful.createClient()

export default {
  contentfulClient: client
}
