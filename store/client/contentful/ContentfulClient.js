const contentful = require('contentful')

class ContentfulClient {
  constructor({ space, accessToken, host }) {
    this.contentfulClient = contentful.createClient({
      space: space,
      accessToken: accessToken,
      host: host
    })
  }
}

export default ContentfulClient
